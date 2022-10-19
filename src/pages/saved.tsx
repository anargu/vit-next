import React, { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { SheetWrapper } from '../components/SheetWrapper/SheetWrapper';
import NavBar from '../components/NavBar';
import { ResourceCard } from '../components/ResourceCard/ResourceCard';
import { useSavedResources } from '../hooks/useSavedResources';

export const SavedPage = () => {

  const { savedResources, saveResource } = useSavedResources();

  const [showSaveUrlSheet, setShowSaveUrlSheet] = useState(false);

  type SubmitFormTypes = {
    inputLink: string
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SubmitFormTypes>();

  const onSubmitCutomLink : SubmitHandler<SubmitFormTypes> = async (data) => {
    await saveResource(data.inputLink);

    setShowSaveUrlSheet(false);
    reset();
  };

  const PageWrapper = ({ children } : any) => (
    <>
      <NavBar/>

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
        <div className="pb-8 pt-4 px-4">
          <form onSubmit={handleSubmit(onSubmitCutomLink)}>
            <div className="mb-4">
              <label htmlFor="custom-url-input">Insert a URL you want to save</label>
              <input
                id="custom-url-input"
                type="text"
                autoFocus
                placeholder="Paste or type url"
                className="bg-slate-200 rounded outline-none py-2 px-2 w-full"
                {...register("inputLink", { required: true })}
              />
              { errors.inputLink && <span className="text-red-500">Error </span> }
            </div>
            <div className="text-right">
              <input type="submit" value="Save" className="inline-block bg-yellow-400 px-4 py-2 rounded" />
            </div>
          </form>
        </div>
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
    <PageWrapper key={savedResources}>
      {SavedPostsList}
    </PageWrapper>
  );
};

