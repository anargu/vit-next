import { useEffect, useState } from "react";
import { SAVED_LINK_KEY } from "../components/ResourceCard/ResourceCard";
import { VITResource } from "../core/entities";

export const useSavedResources = () => {

  const [savedResources, setSavedResources] = useState<null | VITResource[]>(null);

  useEffect(() => {
    if (!!savedResources) return;

    const rawData = localStorage.getItem(SAVED_LINK_KEY);
    if (!rawData) return setSavedResources([]);
    
    const savedPosts : VITResource[] | null = JSON.parse(rawData);
    if (!savedPosts) return setSavedResources([]);

    /* const _resources = savedPosts.map((post) => Resource.fromVITResource(post)); */
    
    setSavedResources(savedPosts);
  }, [savedResources]);

  return { savedResources };
};
