import { useEffect, useState } from "react";
import { SAVED_LINK_KEY } from "../components/ResourceCard/ResourceCard";
import { VITResource } from "../core/entities";

export type SaveResult = {
  isAlreadySaved: boolean,
};

export const useSavedResources = () => {

  const [savedResources, setSavedResources] = useState<null | VITResource[]>(null);

  useEffect(() => {
    if (!!savedResources) return;

    const rawData = localStorage.getItem(SAVED_LINK_KEY);
    if (!rawData) return setSavedResources([]);
    
    const savedPosts : VITResource[] | null = JSON.parse(rawData);
    if (!savedPosts) return setSavedResources([]);

    setSavedResources(savedPosts);
  }, [savedResources]);

  const saveResource = (resource : string | VITResource) : SaveResult => {
    const isStringUrl = typeof resource === "string";

    // Fetch all posts.
    const rawData = localStorage.getItem(SAVED_LINK_KEY) ?? "[]";
    
    const savedPosts : VITResource[] = JSON.parse(rawData);

    const resourceIndex = savedPosts.findIndex((vitPost) => (isStringUrl ? resource === vitPost.url : resource.url === vitPost.url));

    const isAlreadySaved = resourceIndex !== -1;

    let updatedSavedPosts;

    if (isAlreadySaved) {
      updatedSavedPosts = savedPosts.filter((_, index) => index !== resourceIndex);
    } else {
      updatedSavedPosts = [
        ...savedPosts,
        isStringUrl
        ? {
            id: resource,
            date_created: new Date().toISOString(),
            url: resource,
            url_title: resource
          } as VITResource
        : resource];
    }

    localStorage.setItem(SAVED_LINK_KEY, JSON.stringify(updatedSavedPosts));

    setSavedResources([...updatedSavedPosts]);

    return { isAlreadySaved };
  };

  return { savedResources, saveResource };
};
