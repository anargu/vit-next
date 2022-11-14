import { ga, ON_CLICK_SAVE_POST_EVENT, SAVE_POST_SUCESSFULLY_EVENT } from "../../lib/ga";
import { useEffect, useMemo, useState } from "react";
import { showDefaultNotification, showNotification } from "../components/Notification/Notification";
import { SAVED_LINK_KEY } from "../components/ResourceCard/ResourceCard";
import { DOMAIN_REGEX } from "../core/constants";
import { Resource, VITResource } from "../core/entities";
import { fetchMetadataFromURL, insertLink, unsaveLink } from "../services/datasource";
import { useAuth } from "./useAuth";
import { useLinks } from "./useLinks";

export const useSavedResources = () => {

  const { authUser, isAuthenticated } = useAuth();

  const { userLinks } = useLinks(authUser);

  const [localResources, setLocalResources] = useState<null | Resource[]>(null);

  const savedResourcesV2 = useMemo<Resource[] | null>(() => {
    if (!isAuthenticated) return localResources ?? [];

    if (!userLinks) return null;

    return userLinks;
  }, [userLinks, isAuthenticated, localResources]);

  useEffect(() => {
    if (!!localResources) return;

    const rawData = localStorage.getItem(SAVED_LINK_KEY);
    if (!rawData) return setLocalResources([]);
    
    const savedPosts_ : VITResource[] | null = JSON.parse(rawData);

    if (!savedPosts_) return setLocalResources([]);

    setLocalResources(savedPosts_.map(Resource.fromVITResource));
  }, [localResources]);

  const saveResource = async (resource : string | Resource) : Promise<null | any> => {
    try {
      if (!isAuthenticated) throw new Error("To save, user should be authenticated.");

      const isStringUrl = typeof resource === "string";

      let resourceMetadata : Resource | null = null;

      if (isStringUrl) {
        ga.event({ action: ON_CLICK_SAVE_POST_EVENT, params: {} });

        resourceMetadata = await fetchMetadataFromURL(resource);
      }

      let isAlreadySaved = false;

      if (!isStringUrl && userLinks?.find((link) => link.id === resource.id)) {
        isAlreadySaved = true;
      }

      const operationPromise = isAlreadySaved
        ? unsaveLink((resource as Resource).id!)
        : insertLink(resourceMetadata!, authUser!);

      await operationPromise;

      if (typeof resource === "string") {
        const domain = resource.match(DOMAIN_REGEX)?.[0];

        ga.event({
          action: SAVE_POST_SUCESSFULLY_EVENT,
          params: { domain: domain }
        });
      }

      showDefaultNotification(isAlreadySaved ? "Link unsaved." : "Link saved locally.");

      return null;
    } catch (error : any) {
      console.error(error);

      showNotification(
        error?.message ?? "Something went wrong",
        "Error",
        { color: "red", }
      );

      return error;
    }
  };

  return { savedResourcesV2, localResources, saveResource, unsaveLink };
};
