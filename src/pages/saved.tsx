import React, { useMemo } from 'react';
import { ResourceCard } from '../components/ResourceCard/ResourceCard';
import { useSavedResources } from '../hooks/useSavedResources';
import { SubmitLinkForm } from '../components/SubmitLinkForm/SubmitLinkForm';
import { AnimatePresence, motion } from 'framer-motion';
import { useDetailedCard } from '../components/DetailedCard/DetailedCard';

export const SavedPage = () => {

  const { savedResourcesV2, saveResource } = useSavedResources();

  const { show: showDetailedCard, DetailedCardWrapper } = useDetailedCard();

  const SavedPageWrapper = ({ children } : any) => (
    <>
      <DetailedCardWrapper
        isSaved={true}
        onSaveClicked={saveResource} />

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

  const SavedPostsList = useMemo(() => {
    if (!savedResourcesV2) return null;

    return (
      <div className="grid grid-cols-2">
        <AnimatePresence>
          {savedResourcesV2.map((resource, index) => (
            <motion.div
              key={`resource-${index}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                default: { ease: "easeOut", duration: 0.2 }
              }}
              exit={{ opacity: 0 }}
            >
              <ResourceCard
                resource={resource}
                isSaved={true}
                onSaveResource={saveResource}
                onShowDetailedCard={(resource) => showDetailedCard(resource)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }, [savedResourcesV2]);

  // savedResources is null, it is loading
  if (savedResourcesV2 === null) return (
    <SavedPageWrapper>
      loading...
    </SavedPageWrapper>
  );

  // No Saved Posts
  if (savedResourcesV2.length === 0) return (
    <SavedPageWrapper>
      <div className="mx-4 px-4 py-2 bg-amber-300">
        No Saved Posts. Save new ones by adding your links.
      </div>
    </SavedPageWrapper>
  );

  return (
    <SavedPageWrapper>
      {SavedPostsList}
    </SavedPageWrapper>
  );
};

