import React, { useEffect, useState } from 'react';
import { DetailedCardSheet } from '../components/DetailedCard/DetailedCardSheet';
/* import { MeiliSearchBar } from '../components/MeiliSearch'; */
import { ResourceCard } from '../components/ResourceCard/ResourceCard';
import { useAuth } from '../hooks/useAuth';
import { useLinks } from '../hooks/useLinks';

export const IndexPage = () => {
  const { authUser } = useAuth();
  const { feedLinks, initListeningFeed } = useLinks(authUser);
  const [selectedResourceID, setSelectedResourceID] = useState<string | null>(null);

  useEffect(() => {
    const unSub = initListeningFeed();

    return () => {
      unSub?.();
    };
  }, []);

  return (
    <>
      <DetailedCardSheet
        isSaved={true}
        resourceId={selectedResourceID}
        onClose={() => setSelectedResourceID(null)}
        showPrivacySetting={false}
      />

      <div className="grid grid-rows-[320px_min-content_min-content] min-h-[calc(100vh-72px)]">
        <div className="text-stone-900 leading-tight text-4xl max-w-[80%] mx-6">
          VIT, a curated feed of tons of interesting articles, news, tutorials... things.
        </div>

        {/* <MeiliSearchBar ResultHitCard={ResourceCard}></MeiliSearchBar> */}
        <div className="px-1 grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {feedLinks?.map((resource, index) => (
            <ResourceCard
              key={`resource-${resource?.id ?? index}`}
              resource={resource}
              isSaved={false}
              onShowDetailedCard={(resource) => setSelectedResourceID(resource.id)}
            />
          ))}
        </div>

      </div>
    </>
  );
};
