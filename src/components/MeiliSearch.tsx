import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch(
  "https://integration-demos.meilisearch.com",
  "q7QHwGiX841a509c8b05ef29e55f2d94c02c00635f729ccf097a734cbdf7961530f47c47",
  {
    primaryKey: "id",
  }
);

const Hit = ({ hit } : any) => <Highlight attribute="name" hit={hit} />;

export const MeiliSearchBar = () => (
  <div>
    <InstantSearch
      indexName="steam-video-games"
      searchClient={searchClient}
    >
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  </div>
);

