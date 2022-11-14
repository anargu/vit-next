import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { showNotification } from '../Notification/Notification';

export type SubmitLinkFormProps = {
  showLabel?: boolean,
  onSubmitWithData: (link : string) => Promise<any | null>,
};

export const SubmitLinkForm = (props : SubmitLinkFormProps) => {

  const [loading, setLoading] = useState(false);

  type SubmitFormTypes = {
    inputLink: string
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SubmitFormTypes>();

  const onSubmitCutomLink : SubmitHandler<SubmitFormTypes> = async (data) => {
    setLoading(true);

    const error = await props.onSubmitWithData?.(data.inputLink);

    setLoading(false);

    if (error) return;
    
    showNotification("New Link Saved", "Success", {
      color: "green"
    });

    reset();


  };

  return (
    <div className="px-4">
      <form onSubmit={handleSubmit(onSubmitCutomLink)}>
        <div className="">
          <div className="pb-3">
            {props.showLabel && 
              <label className="text-md" htmlFor="custom-url-input">Insert URL you want to save</label>
            }
          </div>
          <div className="grid grid-cols-[auto_96px]">
            <input
              id="custom-url-input"
              type="text"
              autoFocus
              disabled={loading}
              placeholder="Paste or type url"
              className="bg-slate-200 rounded outline-none py-2 px-2 w-full disabled:text-gray-500"
              {...register("inputLink", { required: true })}
            />

            <div className="text-right">
              <input
                type="submit"
                value={loading ? "Saving..." : "Save"}
                disabled={loading}
                role="button"
                className="bg-amber-300 text-md px-6 py-2 rounded disabled:bg-amber-200 h-full" />
            </div>

          </div>
          { errors.inputLink && <span className="text-red-500">Error </span> }
        </div>
      </form>
    </div>
  );
};
