import React from 'react';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { Hit } from 'react-instantsearch-core';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { VITResource } from './ResourceCard/ResourceCard';

const searchClient = instantMeiliSearch(
  "https://integration-demos.meilisearch.com",
  "q7QHwGiX841a509c8b05ef29e55f2d94c02c00635f729ccf097a734cbdf7961530f47c47",
  {
    primaryKey: "id",
  }
);

type MeiliSearchBarProps = {
  ResultHitCard: React.ComponentType<{ hit: Hit<VITResource> }>,
};

export const MeiliSearchBar = ({ ResultHitCard } : MeiliSearchBarProps) => (
  <div>
    <InstantSearch
      indexName="steam-video-games"
      searchClient={searchClient}
    >
      <SearchBox />
      <Hits hitComponent={ResultHitCard} />
    </InstantSearch>
  </div>
);

