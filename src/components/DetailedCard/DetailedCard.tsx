import { Resource, VITResource } from "@/src/core/entities";
import { ReactNode, useMemo, useState } from "react";
import Bookmark from "../../../public/assets/bookmark.svg";
import Share from "../../../public/assets/share.svg";
import { SheetWrapper } from "../SheetWrapper/SheetWrapper";

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
  
  const close = () => setHit(null);

  const detailedCard = useMemo(() => {
    if (!hit) return null;

    return <SheetWrapper
      show={true}
      onCloseSheet={close}>
      <DetailedCard hit={hit} />
    </SheetWrapper>
    /* return <DetailedCard hit={hit} onClose={close} /> */
  }, [hit]);

  return { show, close, detailedCard };
};

export const DetailedCard = (props : DetailedCardProps) => {

  const resourceData = useMemo(() => Resource.fromVITResource(props.hit), [props.hit]);

  const ActionBar = () => (
    <div className="grid grid-cols-[100px_auto_80px]">
      <OutlineButton onClick={() => {
        if (!props.hit.url) return;
        if (typeof window === "undefined") return;

        window.location.href = props.hit.url
      }}>Visit Site</OutlineButton>
      <div />
      <div className="inline-flex justify-between items-center">
        <span title="Save Button" onClick={props.onSaveClicked}><Bookmark /></span>
        <span title="Share Button" onClick={props.onShareClicked}><Share /></span>
      </div>
    </div>
  );

  return (
    <div>
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
  );
};
