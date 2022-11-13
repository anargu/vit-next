import { useEffect, useMemo, useState } from "react";
import { SAVED_LINK_KEY } from "../components/ResourceCard/ResourceCard";
import { Resource, VITResource } from "../core/entities";
import { fetchMetadataFromURL, insertLink, unsaveLink } from "../services/datasource";
import { useAuth } from "./useAuth";
import { useLinks } from "./useLinks";

export type SaveResult = {
  isAlreadySaved: boolean,
};

export const useSavedResources = () => {

  const { authUser } = useAuth();

  const { userLinks } = useLinks(authUser);

  const savedResourcesV2 = useMemo<VITResource[] | null>(() => {
    if (!userLinks) return null;

    return userLinks;
  }, [userLinks]);

  const [savedResources, setSavedResources] = useState<null | VITResource[]>(null);

  useEffect(() => {
    if (!!savedResources) return;

    const rawData = localStorage.getItem(SAVED_LINK_KEY);
    if (!rawData) return setSavedResources([]);
    
    const savedPosts : VITResource[] | null = JSON.parse(rawData);
    if (!savedPosts) return setSavedResources([]);

    setSavedResources(savedPosts);
  }, [savedResources]);

  const saveResource = async (resource : string | VITResource) : Promise<SaveResult> => {
    const isStringUrl = typeof resource === "string";

    let resourceMetadata : VITResource | null = null;

    if (isStringUrl) {
      resourceMetadata = await fetchMetadataFromURL(resource);
    }

    let isAlreadySaved = false;
    if (!isStringUrl && userLinks?.find((link) => link.id === resource.id)) {
      isAlreadySaved = true;
    }

    const operationPromise = isAlreadySaved
      ? unsaveLink((resource as VITResource).id!)
      : insertLink(resourceMetadata!, authUser!);

    await operationPromise;

    return { isAlreadySaved: false };
  };

  const isSaved = (hit : VITResource) => {
    if (!userLinks) return false;

    const found = userLinks.find((savedResource) => savedResource.id === hit.id);

    return !!found
  };

  return { savedResourcesV2, saveResource, isSaved, savedResources, unsaveLink };
};
