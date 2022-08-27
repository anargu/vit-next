import { Resource, VITResource } from "@/src/core/entities";
import { ReactNode, useMemo, useState } from "react";
import Bookmark from "../../../public/assets/bookmark.svg";
import Share from "../../../public/assets/share.svg";

export type DetailedCardProps = {
  hit: VITResource,
  onSaveClicked?: () => void,
  onShareClicked?: () => void,
  onClose?: () => void,
};

const OutlineButton = (props : { children: ReactNode, onClick?: any }) => (
  <button
    className="px-2 py-1 outline-none rounded-md border-2 border-gray-800"
    onClick={props.onClick}
  >{props.children}</button>
);

export const useDetailedCard = () => {
  const [hit, setHit] = useState<VITResource | null>(null);


  const show = (data : VITResource) => setHit(data);


  const detailedCard = useMemo(() => {
    if (!hit) return null;

    return <DetailedCard hit={hit} />
  }, [hit]);

  return { show, detailedCard };
};

export const DetailedCard = (props : DetailedCardProps) => {

  const resourceData = useMemo(() => Resource.fromVITResource(props.hit), [props.hit]);

  const ActionBar = () => (
    <div className="grid grid-cols-[100px_auto_80px]">
      <OutlineButton>Visit Site</OutlineButton>
      <div />
      <div className="inline-flex justify-between items-center">
        <span title="Save Button" onClick={props.onSaveClicked}><Bookmark /></span>
        <span title="Share Button" onClick={props.onShareClicked}><Share /></span>
      </div>
    </div>
  );

  return (
    <div className="h-[100vh] w-full relative">
      <div className="h-full bg-black/50 z-10">
        <div onClick={() => props.onClose?.()} className="cursor-pointer m-4 float-right text-4xl text-white font-bold">&times;</div>
      </div>
      <div className="h-[60vh] absolute bottom-0 w-full z-20 bg-white">
        <div className="mx-6 py-2"><ActionBar /></div>
        <div className="bg-black text-center h-[160px]">
          {resourceData.imageSrc && (
            <img className="inline-block aspect-video h-full max-h-[220px]" alt={resourceData.imageAlt || ""} src={resourceData.imageSrc} />
          )}
        </div>
        <div className="mx-6">
          <h1 className="my-4 mx-0">{resourceData.title}</h1>
          <p>{resourceData.description}</p>
        </div>
      </div>
    </div>
  );
};
