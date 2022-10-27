import { Resource, VITResource } from "@/src/core/entities";
import { MutableRefObject, ReactNode, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Bookmark from "../../../public/assets/bookmark.svg";
import Trash from "../../../public/assets/trash.svg";
import Share from "../../../public/assets/share.svg";
import { SheetWrapper } from "../SheetWrapper/SheetWrapper";
import { useOnClickOutside } from "@/src/hooks/useOnClickOutside";

export type DetailedCardProps = {
  hit: VITResource,
  innerRef: MutableRefObject<HTMLDivElement>,
  isSaved?: boolean,
  onSaveClicked?: () => void,
  onShareClicked?: () => void,
  onClose?: () => void,
};

export type DetailedCardWrapperProps = {
  isSaved?: boolean,
  onSaveClicked?: () => void,
  onShareClicked?: () => void,
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

  const DetailedCardWrapper = (props : DetailedCardWrapperProps) => {
    const detailedCardRef = useRef<any>(null);

    useOnClickOutside(detailedCardRef, () => close());

    if (!hit) return null;

    return <SheetWrapper
      show={true}
      onCloseSheet={close}>
      <DetailedCard
        innerRef={detailedCardRef}
        hit={hit}
        isSaved={props.isSaved}
        onSaveClicked={props.onSaveClicked}
        onShareClicked={props.onShareClicked}
      />
    </SheetWrapper>
  };

  return { show, close, DetailedCardWrapper };
};

export const DetailedCard = (props : DetailedCardProps) => {

  const resourceData = useMemo(() => Resource.fromVITResource(props.hit), [props.hit]);

  const ActionBar = () => (
    <div className="grid grid-cols-[100px_auto_80px]">
      <OutlineButton onClick={() => {
        if (!props.hit.url) return;
        if (typeof window === "undefined") return;

        window.open(props.hit.url, "_blank");
      }}>Visit Site</OutlineButton>
      <div />
      <div className="inline-flex justify-between items-center">
        <ActionStyled title="Save Button" onClick={props.onSaveClicked}>
          {props.isSaved
            ? <Trash />
            : <Bookmark />
          }
        </ActionStyled>
        <ActionStyled title="Share Button" onClick={props.onShareClicked}><Share /></ActionStyled>
      </div>
    </div>
  );

  return (
    <div ref={props.innerRef}>
      <div className="mx-6 py-4"><ActionBar /></div>
      <div className="bg-black text-center h-[160px]">
        {resourceData.imageSrc && (
          <img className="inline-block aspect-video h-full max-h-[220px]" alt={resourceData.imageAlt || ""} src={resourceData.imageSrc} />
        )}
      </div>
      <div className="relative mx-6 mb-8 min-h-[100px] max-h-[300px] overflow-hidden">
        <h1 className="mb-2 mt-4 mx-0 text-2xl">{resourceData.title}</h1>
        <p>{resourceData.description}</p>
        <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-white"></div>
      </div>
    </div>
  );
};

const ActionStyled = styled.span`
  svg.filled path {
    fill: #000;
  }
`;

