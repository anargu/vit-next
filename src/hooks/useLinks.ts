import { useEffect, useMemo, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

import { useAuth } from "./useAuth";
import { DOMAIN_REGEX, SAVED_LINK_KEY } from "../core/constants";
import { fetchMetadataFromURL } from "../services/metadataService";
import { JSONResource, LinkPrivacy, Resource } from "../core/entities";
import { FirestoreStorageStrategy } from "../services/FirestoreStorageStrategy";
import { ga, ON_CLICK_SAVE_POST_EVENT, SAVE_POST_SUCESSFULLY_EVENT } from "../../lib/ga";

const firestoreDataManager = new FirestoreStorageStrategy();

export type UpdatePrivacySettingFn = (resourceId : string, privacy : LinkPrivacy) => Promise<void>;
export type SaveResourceFn = (resource : string | Resource) => Promise<void>;
export type DeleteResourceFn = (resourceId : string) => Promise<void>;

export interface useLinksOptions {
  listenSavedLinks?: boolean;
  listenFeedLinks?: boolean;
};

export function useLinks (opts: useLinksOptions = { listenSavedLinks: false, listenFeedLinks: false }) {

  const { authUser, isAuthenticated } = useAuth();

  const [_userLinks, _setUserLinks] = useState<Resource[] | null>([]);

  const [feedLinks, setFeedLinks] = useState<Resource[] | null>([]);

  // localLinks are saved links in LocalStorage 
  const [localLinks, setLocalLinks, { removeItem: deleteLocalLinks }] = useLocalStorageState<JSONResource[]>(SAVED_LINK_KEY, { defaultValue: [] });

  const userLinks = useMemo(() => {
    if (isAuthenticated) return _userLinks;

    return localLinks.map((localLink) => Resource.fromJSONResource(localLink));
  }, [isAuthenticated, localLinks, _userLinks]);

  // TODO: Implement this
  /* const initListeningLinksByUserId = (userId: string) => { */
  /*   const unSub = firestoreDataManager.listenLinksbyUserId(userId, (resources) => { */
  /*     _setUserLinks(resources); */
  /*   }); */
  /**/
  /*   return unSub; */
  /* }; */

  useEffect(() => {
    if (!authUser) return;
    if (!opts.listenSavedLinks) return;

    const unSub = firestoreDataManager.listenLinksbyUserId(authUser!.id, (resources) => {
      _setUserLinks(resources);
    });

    return () => {
      unSub?.();
    };
  }, [authUser?.id, opts.listenSavedLinks]);

  useEffect(() => {
    if (!opts.listenFeedLinks) return;

    const unSub = firestoreDataManager.listenFeedLinks((resources) => {
      setFeedLinks(resources);
    });

    return () => {
      unSub?.();
    };
  }, [opts.listenFeedLinks]);

  const insertLink = async (url : string) => {
    try {
      ga.event({ action: ON_CLICK_SAVE_POST_EVENT, params: {} });

      // Fetch Metadata of URL string
      let resourceMetadata = await fetchMetadataFromURL(url);

      // Save resource and its metadata
      const insertPromise = isAuthenticated
        ? firestoreDataManager.insert(resourceMetadata, authUser)
        : setLocalLinks([...localLinks, resourceMetadata.toJSON()]);

      await insertPromise;

      // Track analytics event
      const domain = url.match(DOMAIN_REGEX)?.[0];

      ga.event({
        action: SAVE_POST_SUCESSFULLY_EVENT,
        params: { domain: domain }
      });
    } catch (error : any) {
      console.error(error);

      throw error;
    }
  };

  const updateLinkPrivacy = async (resourceId: string, privacy: LinkPrivacy) => {
    try {
      if (!isAuthenticated) {
        throw Error("Operation cannot be done if user is not logged in.");
      }

      // User is logged in then update to DB.
      await firestoreDataManager.updateLinkPrivacy(resourceId, privacy);

    } catch (error : any) {
      console.error(error);

      throw error;
    }
  };

  const deleteLink = async (resourceId: string) => {
    try {
      if (!isAuthenticated) {
        setLocalLinks(localLinks.filter((_link) => _link.id !== resourceId));
        return;
      }

      await firestoreDataManager.delete(resourceId);
    } catch (error : any) {
      console.error(error);

      throw error;
    }
  };

  return {
    localLinks,
    deleteLocalLinks,

    userLinks,
    feedLinks,

    insertLink,
    deleteLink,
    updateLinkPrivacy,

    bulkInsertLinks: firestoreDataManager.bulkInsert,
  };
}
