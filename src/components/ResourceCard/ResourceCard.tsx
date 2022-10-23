import { Resource, VITResource } from "../../core/entities";
import { useMemo } from "react";
import styled from 'styled-components';
import Bookmark from "../../../public/assets/bookmark.svg";
import Share from "../../../public/assets/share.svg";
import { showDefaultNotification, showNotification,  } from "../Notification/Notification";
import { BackgroundImage } from "./BackgroundImage";
import { useDetailedCard } from "../DetailedCard/DetailedCard";
import { SaveResult, useSavedResources } from "../../hooks/useSavedResources";

export type ResourceCardProps = {
  hit: VITResource,
  onSaveResource?: (resource : VITResource) => Promise<SaveResult>,
};

export const SAVED_LINK_KEY = "saved_posts";

export const ResourceCard = ({ hit, onSaveResource } : ResourceCardProps) => {

  const { show: showDetailedCard, DetailedCardWrapper } = useDetailedCard();

  const { isSaved } = useSavedResources();

  const resourceData = useMemo(() => Resource.fromVITResource(hit), [hit]);

  const onSaveClicked = async () => {
    if (!onSaveResource) return showNotification("Error", "Function not available yet.", { color: "red" });
    
    const { isAlreadySaved } = await onSaveResource(hit);

    showDefaultNotification(isAlreadySaved ? "Link unsaved." : "Link saved locally.");
  };

  const onShareClicked = () => {
    navigator.clipboard.writeText(hit.url || "");
    showDefaultNotification("Link copied to Clipboard.");
  };

  const onSelectCard = () => {
    showDetailedCard(hit);
  };
  
  // TODO: Remove if a third action is not needed
  // const onCopyLinkClicked = () => {};

  return (
    <>
      <DetailedCardWrapper
        isSaved={isSaved(hit)}
        onShareClicked={onShareClicked}
        onSaveClicked={onSaveClicked} />

      <div className="relative py-4 px-4 text-white h-full" onClick={onSelectCard}>
        {/* colored overlay */}
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-slate-900/80 z-20" />

        {resourceData.imageSrc && (
          <div className="absolute top-0 right-0 bottom-0 left-0 z-10">
            <BackgroundImage alt={resourceData.imageAlt || "Link image"} src={resourceData.imageSrc} />
          </div>
        )}

        <div className="relative z-30 h-full grid grid-rows-[min-content_2fr_1fr_36px] gap-5">
          <div className="text-right"><span>{resourceData.timeAgo.toString()}</span></div>

          <p className={`py-0 max-h-[calc(2.5rem*4)]
            text-4xl text-multiline-overflow-mixin
            text-ellipsis [-webkit-line-clamp:4]`}>{resourceData.title}</p>

          <p className="self-center max-h-[calc(2rem*4)] text-2xl text-multiline-overflow-mixin text-ellipsis [-webkit-line-clamp:2]">{resourceData.description}</p>
          <ActionsStyled className="flex justify-around">
            {/* Remove <Link /> Icon If a third action is unneeded */}
            {/* <Link/> */}
            <span className="relative z-20" title="Save Button" onClick={(e) => {
              e.stopPropagation();

              onSaveClicked();
            }}><Bookmark className={isSaved(hit) ? "filled" : ""} /></span>
            <span title="Share Button" onClick={onShareClicked}><Share/></span>
          </ActionsStyled>
        </div>
      </div>
    </>
  );
};

const ActionsStyled = styled.div`
  svg path {
    stroke: #FFF;
  }

  svg.filled path {
    fill: #FFF;
  }
`;
