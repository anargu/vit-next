import { useEffect, useState } from "react";
import { Resource, User } from "../core/entities";
import { listenFeedLinks, listenLinksFromUser } from "../services/datasource";
import { DataTransformer, Link } from "../services/entities";

export function useLinks (user : User | null) {

  const [userLinks, setUserLinks] = useState<Resource[] | null>([]);

  const [feedLinks, setFeedLinks] = useState<Resource[] | null>([]);

  useEffect(() => {
    if (!user) return;

    const unSub = listenLinksFromUser(user.id, (linksSnap) => {
      setUserLinks(linksSnap.docs.map((link) => DataTransformer.fromLinktoResource({
        ...link.data() as Link,
        id: link.id,
      })));
    });

    return () => {
      unSub?.();
    };
  }, [user]);

  const initListeningFeed = () => {
    const unSub = listenFeedLinks((linksSnap) => {
      const feedResources_ = linksSnap.docs.map((link) => DataTransformer.fromLinktoResource({
        ...link.data() as Link,
        id: link.id,
      }));

      setFeedLinks(feedResources_);
    });

    return unSub;
  };

  return {
    userLinks,
    initListeningFeed,
    feedLinks,
  };
}
