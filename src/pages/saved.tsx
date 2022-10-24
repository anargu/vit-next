import React, { useMemo, useState } from 'react';
import { SheetWrapper } from '../components/SheetWrapper/SheetWrapper';
import { ResourceCard } from '../components/ResourceCard/ResourceCard';
import { useSavedResources } from '../hooks/useSavedResources';
import { SubmitLinkForm } from '../components/SubmitLinkForm/SubmitLinkForm';

export const SavedPage = () => {

  const { savedResources, saveResource } = useSavedResources();

  const [showSaveUrlSheet, setShowSaveUrlSheet] = useState(false);

  const SavedPageWrapper = ({ children } : any) => (
    <>
      <div className="py-4 text-center text-gray-400 text-sm leading-8">
        Wanna save your links? <span
          onClick={(e) => {
            // opens sheet 
            e.stopPropagation();

            setShowSaveUrlSheet(true);
          }}
          className="rounded px-2 underline cursor-pointer py-1 text-yellow-400 text-white" title="Save a Link">Save yours here.</span>
      </div>

      <SheetWrapper show={showSaveUrlSheet} onCloseSheet={() => {setShowSaveUrlSheet(false);}}>
        <SubmitLinkForm
          onSubmitWithData={async (link) => {
            await saveResource(link);
            setShowSaveUrlSheet?.(false);
          }}
        />
      </SheetWrapper>

      <div className="min-h-[calc(100vh-72px)]">
        {children}
      </div>
    </>
  );

  const SavedPostsList = useMemo(() => {
    if (!savedResources) return null;

    return savedResources.map((resource, index) => (
      <div key={`resource-${index}`}>
        <ResourceCard hit={resource} onSaveResource={saveResource}></ResourceCard>
      </div>
    ))
  }, [savedResources]);

  // savedResources is null, it is loading
  if (savedResources === null) return (
    <SavedPageWrapper>
      loading...
    </SavedPageWrapper>
  );

  // No Saved Posts
  if (savedResources.length === 0) return (
    <SavedPageWrapper>
      No Saved Posts. Save new ones on Feed section.
    </SavedPageWrapper>
  );

  return (
    <SavedPageWrapper key={savedResources}>
      {SavedPostsList}
    </SavedPageWrapper>
  );
};

