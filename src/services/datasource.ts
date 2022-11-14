import { APIResponse } from "@/pages/api/entities";
import { MetascrapperResponse } from "@/pages/api/metadata";
import { firestore } from "../firebase";
import { addDoc, updateDoc, collection, doc, DocumentData, getDoc, onSnapshot, query, QuerySnapshot, where } from "firebase/firestore";
import { SAVED_LINK_KEY } from "../components/ResourceCard/ResourceCard";
import { AuthenticatedUser, Resource, User, VITResource } from "../core/entities";

const fetchUser = async (id : string) : Promise<User> => {
  const userRef = doc(firestore, `users/${id}`);
  const userSnap = await getDoc(userRef);

  const user = userSnap.data();

  return user as User;
};

const listenLinksFromUser = (
  id : string,
  onSnapshotCallback : (snapshot : QuerySnapshot<DocumentData>) => void
) => {
  const linksRef = collection(firestore, `links`);

  const q = query(linksRef, where("byId", "==", id), where("deleted", "==", false))

  const unSub = onSnapshot(q, onSnapshotCallback);
  
  return unSub;
};

const insertLink = async (data : Resource, by : User) => {
  const linksRef = collection(firestore, `links`);

  let modifiedData : any = { ...data };
  delete modifiedData?.id;

  // TODO: Transform datetime fields
  await addDoc(linksRef, {
    ...modifiedData,
    deleted: false,
    byId: by.id,
    by: {
      id: by.id,
      email: by.email,
    },
  });
};

const fetchMetadataFromURL = async (url : string) : Promise<Resource> => {

  const response = await fetch(`/api/metadata?url=${url}`);
  const resourceMetadata = await response.json() as APIResponse;

  if (!resourceMetadata.isOk) return new Resource({
    url: url,
    url_title: url,
  } as VITResource)

  return new Resource({
    date_created: new Date().toISOString(),
    url: (resourceMetadata.data as MetascrapperResponse)?.url,
    url_title: (resourceMetadata.data as MetascrapperResponse)?.title,
    og_image: (resourceMetadata.data as MetascrapperResponse)?.image,
    keyphrase: (resourceMetadata.data as MetascrapperResponse)?.image,
    og_title: (resourceMetadata.data as MetascrapperResponse)?.title,
    og_description: (resourceMetadata.data as MetascrapperResponse)?.description,
  } as VITResource)
};

const migrateLocalData = async (authenticatedUser : AuthenticatedUser) => {
  try {
    if (!authenticatedUser.id) return null;

    const rawData = localStorage.getItem(SAVED_LINK_KEY) ?? "[]";
    const localSavedPosts : VITResource[] = JSON.parse(rawData);

    if (!localSavedPosts || localSavedPosts.length === 0) return null;

    const linksRef = collection(firestore, `links`);

    // Transform
    const insertLocalLinkPromises = localSavedPosts.map(Resource.fromVITResource).map((localPost) => {
      const localPost_ : any = localPost;

      delete localPost_.id;

      return addDoc(linksRef, {
        ...localPost_,
        deleted: false,
        byId: authenticatedUser.id,
        by: { ...authenticatedUser },
      });
    });

    // Upload data
    await Promise.all(insertLocalLinkPromises);

    // Clean local data.
    localStorage.removeItem(SAVED_LINK_KEY);

    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Local data migration failed. Error: ${error?.message}");
  }
};

const unsaveLink = async (linkId : string) => {
  const linksRef = doc(firestore, `links/${linkId}`);

  await updateDoc(linksRef, {
    deleted: true,
  });
};

export {
  fetchUser,
  listenLinksFromUser,
  insertLink,
  unsaveLink,
  fetchMetadataFromURL,
  migrateLocalData,
};
