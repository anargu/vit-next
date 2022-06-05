import { useRouter } from 'next/router';
import React from 'react';
import NavBar from '../components/NavBar';
import { SearchBar } from '../components/SearchBar';

export const IndexPage = () => {
  const router = useRouter();

  return (
    <div className="mx-6">
      <NavBar/>

      <div className="text-stone-900 leading-tight text-4xl max-w-[80%]">
        VIT, a curated feed of tons of interesting articles, news, tutorials... things.
      </div>

      <SearchBar onNewSearch={() => router.push("/feed")} />
    </div>
  );
};
