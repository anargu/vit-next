import { useRouter } from 'next/router';
import React from 'react';
import { MeiliSearchBar } from '../components/MeiliSearch';
import { ResourceCard } from '../components/ResourceCard/ResourceCard';

export const IndexPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-rows-[360px_min-content] min-h-[calc(100vh-72px)]">
        <div className="text-stone-900 leading-tight text-4xl max-w-[80%] mx-6">
          VIT, a curated feed of tons of interesting articles, news, tutorials... things.
        </div>

        <MeiliSearchBar ResultHitCard={ResourceCard}></MeiliSearchBar>
      </div>
    </>
  );
};
