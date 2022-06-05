import { useRouter } from 'next/router';
import React from 'react';
import NavBar from '../components/NavBar';
import { SearchBar } from '../components/SearchBar';

export const IndexPage = () => {
  const router = useRouter();

  return (
    <>
      <NavBar/>

      <div className="grid grid-rows-[360px_min-content] mx-6 min-h-[calc(100vh-72px)]">
        <div className="text-stone-900 leading-tight text-4xl max-w-[80%]">
          VIT, a curated feed of tons of interesting articles, news, tutorials... things.
        </div>

        <SearchBar onNewSearch={() => router.push("/feed")} />
      </div>
    </>
  );
};
