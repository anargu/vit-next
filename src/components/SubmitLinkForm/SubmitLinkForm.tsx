import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { showNotification } from '../Notification/Notification';

// TODO: Tests.
export type SubmitLinkFormProps = {
  onSubmitWithData: (link : string) => Promise<void>,
};

export const SubmitLinkForm = (props : SubmitLinkFormProps) => {

  const [loading, setLoading] = useState(false);

  type SubmitFormTypes = {
    inputLink: string
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SubmitFormTypes>();

  const onSubmitCutomLink : SubmitHandler<SubmitFormTypes> = async (data) => {
    setLoading(true);

    await props.onSubmitWithData?.(data.inputLink);

    showNotification("New Link Saved", "Success", {
      color: "green"
    })

    reset();


    setLoading(false);
  };

  return (
    <div className="pb-8 pt-8 px-4 min-h-[280px]">
      <form onSubmit={handleSubmit(onSubmitCutomLink)}>
        <div className="mb-8">
          <div className="pb-3">
            <label className="text-xl" htmlFor="custom-url-input">Insert URL you want to save</label>
          </div>
          <input
            id="custom-url-input"
            type="text"
            autoFocus
            disabled={loading}
            placeholder="Paste or type url"
            className="bg-slate-200 rounded outline-none py-2 px-2 w-full disabled:text-gray-500"
            {...register("inputLink", { required: true })}
          />
          { errors.inputLink && <span className="text-red-500">Error </span> }
        </div>
        <div className="text-right">
          <input
            type="submit"
            value={loading ? "Saving..." : "Save"}
            disabled={loading}
            className="inline-block bg-yellow-400 text-lg px-6 py-2 rounded disabled:bg-yellow-300" />
        </div>
      </form>
    </div>
  );
};
