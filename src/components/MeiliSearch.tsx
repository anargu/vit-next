import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import { Hit } from 'react-instantsearch-core';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { VITResource } from '../core/entities';


const searchClient = instantMeiliSearch(
  process.env.MEILISEARCH_HOST_URL || "",
  process.env.MEILISEARCH_API_KEY ,
  {
    primaryKey: "id",
  }
);

type MeiliSearchBarProps = {
  ResultHitCard: React.ComponentType<{ hit: Hit<VITResource> }>,
};

export const MeiliSearchBar = (
  { ResultHitCard } : MeiliSearchBarProps
) => (
  <div>
    <InstantSearch
      indexName="resources"
      searchClient={searchClient}
    >
      <SearchBox />
      <Hits hitComponent={ResultHitCard} />
    </InstantSearch>
  </div>
);

