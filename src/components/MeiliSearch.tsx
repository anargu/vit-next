import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import { Hit } from 'react-instantsearch-core';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { VITResource } from '../core/entities';

console.log(">>> process.env.NEXT_PUBLIC_MEILISEARCH_HOST_URL", process.env.NEXT_PUBLIC_MEILISEARCH_HOST_URL);

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST_URL || "",
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY ,
  {
    primaryKey: "id",
  }
);

type MeiliSearchBarProps = {
  ResultHitCard: React.ComponentType<{ hit: Hit<VITResource> }>,
  searchBarWrapperClassName?: string,
};

export const MeiliSearchBar = (
  { ResultHitCard, searchBarWrapperClassName } : MeiliSearchBarProps
) => (
  <div>
    <InstantSearch
      indexName="resources"
      searchClient={searchClient}
    >
      <div className={`${searchBarWrapperClassName || "mx-6"}`}><SearchBox /></div>
      
      <Hits hitComponent={ResultHitCard} />
    </InstantSearch>
  </div>
);

