import { useRouter } from 'next/router';
import React from 'react';
import NavBar from '../components/NavBar';

export const AboutPage = () => {
  return (
    <div className="bg-emerald-100 text-gray-600">
      <NavBar/>

      <div className="grid gap-2 min-h-[calc(100vh-72px)]">
        <h1 className="text-center py-2">About VIT</h1>
        <div className="leading-tight text-lg max-w-[80%] mx-6 mb-2">
          VIT is formed by a small group of Peruvian developers. Our goal (for now) is to
          share useful tools in any sub-field related to Computer Science, Art, UI/UX, XR, and so on.
          We surf on the internet (as probably you do) and collect urls, resources, blogs that we consider <span className="font-bold">interesting</span>.
          Then we share in our small Telegram group those <span className="font-bold">Very Interesting Things (VIT).</span>
        </div>

        <div className="leading-tight text-lg max-w-[80%] mx-6 mb-2">
          Special thanks to <a href="https://www.instagram.com/m4xlr/">Max</a>. His work on the UI design was vital and inspiring to implement the frontend part
        </div>


        <div className="leading-tight float-right text-right max-w-[80%] mx-6">
          <h1 className="mx-0 font-bold text-xl">Website's Author</h1>
          <p className="text-lg">Anthony Aróstegui.<br/>(but you can call me anargu).</p>
          <p>
            Contact: <span><a className="underline" href="https://www.instagram.com/anargu101/" target="_blank">IG</a>
            , <a className="underline" href="https://github.com/anargu" target="_blank">Github</a>
            , <a className="underline" href="https://twitter.com/anargu101" target="_blank">Twitter</a>.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
