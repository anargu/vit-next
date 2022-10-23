import { APIResponse } from "@/pages/api/entities";
import { MetascrapperResponse } from "@/pages/api/metadata";
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

  const saveResource = async (resource : string | VITResource) : Promise<SaveResult> => {
    const isStringUrl = typeof resource === "string";

    let resourceMetadata = null;

    if (isStringUrl) {
      const response = await fetch(`/api/metadata?url=${resource}`);
      resourceMetadata = await response.json() as APIResponse;
    }

    // Fetch all posts.
    const rawData = localStorage.getItem(SAVED_LINK_KEY) ?? "[]";
    
    const savedPosts : VITResource[] = JSON.parse(rawData);

    const resourceIndex = savedPosts.findIndex((vitPost) => (isStringUrl ? resource === vitPost.url : resource.url === vitPost.url));

    const isAlreadySaved = resourceIndex !== -1;

    let updatedSavedPosts : VITResource[];

    if (isAlreadySaved) {
      // Delete the post.
      updatedSavedPosts = savedPosts.filter((_, index) => index !== resourceIndex);
    } else {
      // Append the post.
      updatedSavedPosts = [
        ...savedPosts,
        !isStringUrl
        ? resource
        : !!resourceMetadata && resourceMetadata.isOk
        ? {
            id: (resourceMetadata.data as MetascrapperResponse)?.url ,
            date_created: new Date().toISOString(),
            url: (resourceMetadata.data as MetascrapperResponse)?.url,
            url_title: (resourceMetadata.data as MetascrapperResponse)?.title,
            og_image: (resourceMetadata.data as MetascrapperResponse)?.image,
            og_title: (resourceMetadata.data as MetascrapperResponse)?.title,
            og_description: (resourceMetadata.data as MetascrapperResponse)?.description,
          } as VITResource
        : {
            url: resource,
            url_title: resource,
            id: resource,
        } as VITResource
      ];
    }

    localStorage.setItem(SAVED_LINK_KEY, JSON.stringify(updatedSavedPosts));

    setSavedResources([...updatedSavedPosts]);

    return { isAlreadySaved };
  };

  const isSaved = (hit : VITResource) => {
    if (!savedResources) return false;

    const found = savedResources.find((savedResource) => savedResource.id === hit.id);

    return !!found
  };

  return { savedResources, saveResource, isSaved };
};
