import React from 'react';
import { MeiliSearchBar } from '../components/MeiliSearch';

export const IndexPage = () => {
  return (
    <div className="mx-6">
      <div className="text-stone-900 leading-tight text-4xl max-w-[80%]">
        VIT, a curated feed of tons of interesting articles, news, tutorials... things.
      </div>

      <MeiliSearchBar />
    </div>
  );
};
