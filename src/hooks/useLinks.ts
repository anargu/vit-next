import { useEffect, useState } from "react";
import { User, VITResource } from "../core/entities";
import { listenLinksFromUser } from "../services/datasource";

export function useLinks (user : User | null) {

  const [userLinks, setUserLinks] = useState<VITResource[] | null>([]);

  useEffect(() => {
    if (!user) return;

    const unSub = listenLinksFromUser(user.id, (linksSnap) => {
      setUserLinks(linksSnap.docs.map((link) => ({
        ...link.data() as VITResource,
        id: link.id,
      })));
    });

    return () => {
      unSub?.();
    };
  }, [user]);

  return {
    userLinks,
  };
}
