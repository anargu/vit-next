import React, { useState } from 'react';
import { Resource } from '../core/entities';
import { useLinks } from '../hooks/useLinks';
/* import { MeiliSearchBar } from '../components/MeiliSearch'; */
import { ResourceCard } from '../components/ResourceCard/ResourceCard';
import { DetailedCardSheet } from '../components/DetailedCard/DetailedCardSheet';

export const IndexPage = () => {
  const { feedLinks } = useLinks({ listenFeedLinks: true });

  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  return (
    <>
      <DetailedCardSheet
        isSaved={true}
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
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
              onShowDetailedCard={(resource) => setSelectedResource(resource)}
            />
          ))}
        </div>

      </div>
    </>
  );
};
