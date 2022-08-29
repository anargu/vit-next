import { useRouter } from 'next/router';
import React from 'react';
import NavBar from '../components/NavBar';
import { ResourceCard } from '../components/ResourceCard/ResourceCard';
import { useSavedResources } from '../hooks/useSavedResources';

export const SavedPage = () => {

  const { savedResources } = useSavedResources();

  const PageWrapper = ({ children } : any) => (
    <>
      <NavBar/>

      <div className="min-h-[calc(100vh-72px)]">
        {children}
      </div>
    </>
  );

  // savedResources is null, it is loading
  if (savedResources === null) return (
    <PageWrapper>
      loading...
    </PageWrapper>
  );

  // No Saved Posts
  if (savedResources.length === 0) return (
    <PageWrapper>
      No Saved Posts. Save new ones on Feed section.
    </PageWrapper>
  );

  return (
    <PageWrapper>
      {savedResources.map((resource, index) => (
        <div key={`resource-${index}`}>
          <ResourceCard hit={resource}></ResourceCard>
        </div>
      ))}
    </PageWrapper>
  );
};

