import React, { useMemo, useState } from 'react';
import { ResourceCard } from '../components/ResourceCard/ResourceCard';
import { useSavedResources } from '../hooks/useSavedResources';
import { SubmitLinkForm } from '../components/SubmitLinkForm/SubmitLinkForm';
import { DetailedCardSheet } from '../components/DetailedCard/DetailedCardSheet';

const SavedPageWrapper = ({ children, saveResource } : any) => (
  <>
    <div className="py-4 text-sm leading-8">
      <div className="text-center text-gray-400">
        Wanna save your links? <span
          className="rounded px-2 cursor-pointer py-1 text-amber-500 text-white" title="Save a Link">Save yours here below.</span>
      </div>
      <div>
        <SubmitLinkForm
          showLabel={false}
          onSubmitWithData={saveResource}
        />
      </div>
    </div> 

    <div className="min-h-[calc(100vh-72px)]">
      {children}
    </div>

  </>
);

export const SavedPage = () => {

  const [selectedResourceID, setSelectedResourceID] = useState<string | null>(null);
  const { userLinks, saveResource, updatePrivacySetting } = useSavedResources();

  const SavedPostsList = useMemo(() => {
    if (!userLinks) return null;

    return (
      <div className="px-1 grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {userLinks.map((resource, index) => (
          <ResourceCard
            key={`resource-${resource?.id ?? index}`}
            resource={resource}
            isSaved={true}
            onSaveResource={saveResource}
            onShowDetailedCard={(resource) => setSelectedResourceID(resource.id)}
          />
        ))}
      </div>
    );
  }, [userLinks]);

  // savedResources is null, it is loading
  if (userLinks === null) return (
    <SavedPageWrapper saveResource={saveResource}>
      loading...
    </SavedPageWrapper>
  );

  // No Saved Posts
  if (userLinks.length === 0) return (
    <SavedPageWrapper saveResource={saveResource}>
      <div className="mx-4 px-4 py-2 bg-amber-300">
        No Saved Posts. Save new ones by adding your links.
      </div>
    </SavedPageWrapper>
  );

  return (
    <>
      <DetailedCardSheet
        isSaved={true}
        showPrivacySetting
        onSaveClicked={saveResource}
        resourceId={selectedResourceID}
        onClose={() => setSelectedResourceID(null)}
        onUpdatePrivacySetting={updatePrivacySetting}
      />
      
      <SavedPageWrapper saveResource={saveResource}>
        {SavedPostsList}
      </SavedPageWrapper>
    </>
  );
};

