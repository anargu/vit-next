import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, Unsubscribe, updateDoc, where } from "firebase/firestore";

import { firestore } from "../firebase";
import { DataTransformer, Link } from "./entities";
import { LinkPrivacy, Resource, User } from "../core/entities";
import { ResourcesStorageStrategy } from "./DataStorageStrategy";

export type OnSnapshotCallback = (resources : Resource[]) => void;

export abstract class FirestoreResourcesLiveDataStrategy {
  abstract listenLinksbyUserId(
    id : string,
    onSnapshotCallback : OnSnapshotCallback
  ): Unsubscribe;

  /* abstract listenLinkById(): Promise<Resource[]>; */
  abstract listenFeedLinks(
    onSnapshotCallback : OnSnapshotCallback
  ): Unsubscribe;
}

export abstract class FirestoreResourcesOperationsStrategy {
  abstract bulkInsert: (resources: Resource[], user : User) => Promise<true | null>;
}

export class FirestoreStorageStrategy extends ResourcesStorageStrategy implements FirestoreResourcesLiveDataStrategy, FirestoreResourcesOperationsStrategy {
  private db = firestore;

  async insert(data: Resource, by?: User | null): Promise<void> {
    if (!by) {
      throw Error("By field is missing: User is not logged in.");
    }

    /* Data mutation */
    let modifiedData : any = { ...data };
    delete modifiedData?.id;

    /* Save data on DB */
    const linkDocRef = doc(collection(this.db, `links`));

    // TODO: Transform datetime fields
    await setDoc(linkDocRef, {
      ...modifiedData,
      id: linkDocRef.id,
      deleted: false,
      byId: by.id,
      by: {
        id: by.id,
        email: by.email,
      },
    });
  }

  // Check if already exists url on saved by user
  async cloneIfNonExists(data: Resource, by?: User | null): Promise<void> {
    if (!by) {
      throw Error("By field is missing: User is not logged in.");
    }

    // finds a saved link of same url
    const linksRef = collection(this.db, `links`);

    const queryDocuments = query(linksRef,
      where("byId", "==", by.id),
      where("url", "==", data.url),
      /* where("deleted", "==", false), */
    );

    const linksSnapshot = await getDocs(queryDocuments);

    if (!linksSnapshot.empty) throw Error("URL duplicate. Link already saved.");

    const linkDocRef = doc(collection(this.db, `links`));
    
    const clonedResource = {
      ...data,
      id: linkDocRef.id,
      createdAt: new Date(),
    } as Resource;

    await this.insert(clonedResource, by);
  }

  async updateLinkPrivacy(resourceId: string, privacy: LinkPrivacy): Promise<void> {
    const feedDocRef = doc(this.db, `feed/${resourceId}`);
    const linkRef = doc(this.db, `links/${resourceId}`);

    await updateDoc(linkRef, {
      updatedAt: new Date(),
      isPublic: (privacy as LinkPrivacy) === LinkPrivacy.PUBLIC
        ? true
        : false,
    });

    if (privacy === LinkPrivacy.PRIVATE) {
      await updateDoc(feedDocRef, {
        deleted: true,
        updatedAt: new Date(),
      });

      return;
    }

    const linkSnapshot = await getDoc(linkRef);

    await setDoc(feedDocRef, {
      ...linkSnapshot.data(),
      id: linkSnapshot.id,
      updatedAt: new Date(),
      deleted: false,
    }, { merge: true });
  }

  async delete(resourceId: string): Promise<void> {
    const linksRef = doc(this.db, `links/${resourceId}`);

    await updateDoc(linksRef, {
      deleted: true,
    });
  }

  listenLinksbyUserId(id: string, onSnapshotCallback: (resources: Resource[]) => void) : Unsubscribe {
    const linksRef = collection(firestore, `links`);

    const queryDocuments = query(linksRef, where("byId", "==", id), where("deleted", "==", false), orderBy("createdAt", "desc"))

    const unSub = onSnapshot(queryDocuments,
      (linksSnapshot) => {
        const resources = linksSnapshot.docs.map(
          (doc) => DataTransformer.fromLinktoResource({
            ...doc.data() as Link,
            id: doc.id
          })
        );

        onSnapshotCallback(resources);
      },
      (err) => {
        console.error(err);
      });
    
    return unSub;
  }

  listenFeedLinks(onSnapshotCallback: OnSnapshotCallback): Unsubscribe {
    const linksRef = collection(firestore, `feed`);

    const queryDocuments = query(linksRef, where("deleted", "==", false), orderBy("createdAt", "desc"))

    const unSub = onSnapshot(queryDocuments,
      (snapshot) => {
        const resources = snapshot.docs.map((doc) => DataTransformer.fromLinktoResource({
          ...doc.data() as Link,
          id: doc.id
        }));

        onSnapshotCallback(resources);
      },
      (err) => {
        console.error(err);
      });
    
    return unSub;
  }

  async bulkInsert(resources: Resource[], user : User) {
    try {
      if (!user.id) return null;

      const insertResourcesPromises = resources.map(
        (resource) => this.insert(resource, user));

      // Upload data
      await Promise.all(insertResourcesPromises);

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Local data migration failed. Error: ${error?.message}");
    }
  }
}

export const firestoreManager = new FirestoreStorageStrategy();
