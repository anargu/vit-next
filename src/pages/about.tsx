import React from 'react';

export const AboutPage = () => {
  return (
    <div className="bg-slate-50 text-gray-600">
      <div className="grid gap-2 min-h-[calc(100vh-72px)]">
        <h1 className="text-center py-2">About VIT</h1>

        <div className="leading-tight text-lg max-w-[80%] mx-6 mb-2">

          <div className="">
            <span className="inline-block text-lg mb-4 bg-amber-100 p-4 rounded-lg">
              📢 Wanna give us your feedback? 
              Join our <a className="font-bold underline" href="https://t.me/vitlinksaver" target="_blank">Telegram community.</a>
            </span>
          </div>

          VIT is formed by a small group of Peruvian developers. Our goal (for now) is to
          share useful tools in any sub-field related to Computer Science, Art, UI/UX, XR, and so on.
          We surf on the internet (as probably you do) and collect urls, resources, blogs that we consider <span className="font-bold">interesting</span>.
          Then we share in our small Telegram group those <span className="font-bold">Very Interesting Things (VIT).</span>
        </div>

        <div className="leading-tight text-lg max-w-[80%] mx-6 mb-2">
          Thanks to&nbsp;
          <a className="font-bold underline" href="https://www.instagram.com/m4xlr/" target="_blank">Max</a>&nbsp;
          and&nbsp;
          <a className="font-bold underline" href="https://twitter.com/VktorR" target="_blank">Vktor</a>.
          Their work on the UI and product design are vital to this project.
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
