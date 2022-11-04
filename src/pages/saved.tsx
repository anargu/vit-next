import React, { useMemo } from 'react';
import { ResourceCard } from '../components/ResourceCard/ResourceCard';
import { useSavedResources } from '../hooks/useSavedResources';
import { SubmitLinkForm } from '../components/SubmitLinkForm/SubmitLinkForm';
import { AnimatePresence, motion } from 'framer-motion';
import { ga, ON_CLICK_SAVE_POST_EVENT, SAVE_POST_SUCESSFULLY_EVENT } from '../../lib/ga';

const DOMAIN_REGEX = /^(?:\/\/|[^\/]+)*/;

export const SavedPage = () => {

  const { savedResources, saveResource } = useSavedResources();

  const SavedPageWrapper = ({ children } : any) => (
    <>
      <div className="py-4 text-sm leading-8">
        <div className="text-center text-gray-400">
          Wanna save your links? <span
            className="rounded px-2 cursor-pointer py-1 text-amber-500 text-white" title="Save a Link">Save yours here below.</span>
        </div>
        <div>
          <SubmitLinkForm
            showLabel={false}
            onSubmitWithData={async (link) => {
              ga.event({ action: ON_CLICK_SAVE_POST_EVENT, params: {} });

              await saveResource(link);

              const domain = link.match(DOMAIN_REGEX)?.[0];

              ga.event({
                action: SAVE_POST_SUCESSFULLY_EVENT,
                params: { domain: domain }
              });
            }}
          />
        </div>
      </div> 

      <div className="min-h-[calc(100vh-72px)]">
        {children}
      </div>
    </>
  );

  const SavedPostsList = useMemo(() => {
    if (!savedResources) return null;

    return (
      <div className="grid grid-cols-2">
        <AnimatePresence>
          {savedResources.map((resource, index) => (
            <motion.div
              key={`resource-${index}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResourceCard hit={resource} onSaveResource={saveResource}></ResourceCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
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
      <div className="mx-4 px-4 py-2 bg-amber-300">
        No Saved Posts. Save new ones by adding your links.
      </div>
    </SavedPageWrapper>
  );

  return (
    <SavedPageWrapper key={savedResources}>
      {SavedPostsList}
    </SavedPageWrapper>
  );
};

