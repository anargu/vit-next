import { LinkPrivacy, Resource } from "@/src/core/entities";
import { MutableRefObject, ReactNode, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Bookmark from "../../../public/assets/bookmark.svg";
import Trash from "../../../public/assets/trash.svg";
import Share from "../../../public/assets/share.svg";
import { useResource } from "@/src/hooks/useResource";
import { showDefaultNotification, showNotification } from "../Notification/Notification";
import { SaveResourceFn, UpdatePrivacySettingFn } from "@/src/hooks/useSavedResources";
import { PrivacySetting } from "../ResourceCard/PrivacySetting";

export type DetailedCardProps = {
  hit: Resource,
  innerRef?: MutableRefObject<HTMLDivElement>,
  isSaved?: boolean,
  onSaveClicked?: SaveResourceFn,
  onClose?: () => void,
  showPrivacySetting?: boolean,
  onUpdatePrivacySetting?: UpdatePrivacySettingFn,
};

export type DetailedCardWrapperProps = {
  isSaved?: boolean,
  onSaveClicked?: SaveResourceFn,
  onUpdatePrivacySetting?: UpdatePrivacySettingFn,
};

const OutlineButton = (props : { children: ReactNode, onClick?: any }) => (
  <button
    className="px-2 py-1 outline-none rounded-md border-2 border-gray-800"
    onClick={props.onClick}
  >{props.children}</button>
);

export const DetailedCard = (props : DetailedCardProps) => {

  const { share } = useResource();

  const resourceData = useMemo(() => props.hit, [props.hit]);

  const onSaveClicked = async () => {
    if (!props.onSaveClicked) return showNotification("Error", "Function not available yet.", { color: "red" });
    
    try {
      const { isAlreadySaved } = await props.onSaveClicked?.(resourceData);

      showDefaultNotification(isAlreadySaved ? "Link unsaved." : "Link saved locally.");

    } catch (error : any) {
      showNotification(
        error?.message ?? "Something went wrong",
        "Error",
        { color: "red", }
      );
    }
  };

  const ActionBar = () => (
    <div className="grid grid-cols-[100px_auto_210px]">
      <OutlineButton onClick={() => {
        if (!props.hit.url) return;
        if (typeof window === "undefined") return;

        window.open(props.hit.url, "_blank");
      }}>Visit Site</OutlineButton>
      <div />
      <div className="inline-flex justify-between items-center">
        {/* Make it public option */}
        {props.showPrivacySetting
          ? <ActionStyled title="Privacy setting">
              <PrivacySetting
                isPublic={resourceData.isPublic}
                onChangePrivacy={async (newValue) => {
                  try {
                      
                    await props.onUpdatePrivacySetting?.(props.hit.id ?? "", newValue ? LinkPrivacy.PUBLIC : LinkPrivacy.PRIVATE);

                    showDefaultNotification("Privacy updated.");
                  } catch (error : any) {
                    showNotification(
                      error?.message ?? "Something went wrong",
                      "Error",
                      { color: "red", }
                    );
                  }
                }}
              />
            </ActionStyled>
          : null
        }

        <ActionStyled title="Save Button" onClick={onSaveClicked}>
          {props.isSaved
            ? <Trash />
            : <Bookmark />
          }
        </ActionStyled>

        <ActionStyled
          title="Share Button"
          onClick={(e) => {
            e.preventDefault();

            share(resourceData);
          }}><Share /></ActionStyled>
      </div>
    </div>
  );

  return (
    <div ref={props.innerRef}>
      <div className="mx-6 py-4"><ActionBar /></div>
      <div className="bg-stone-200 text-center h-[160px]">
        {resourceData.imageSrc && (
          <img className="inline-block h-full max-h-[220px]" alt={resourceData.imageAlt || ""} src={resourceData.imageSrc} />
        )}
      </div>
      <div className="relative mx-6 mb-8 max-h-[400px] min-h-[300px] overflow-hidden">
        <h1 className="mb-2 mt-4 mx-0 text-2xl">{resourceData.title}</h1>
        <p>{resourceData.description}</p>
        <div className=" bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-white"></div>
      </div>
    </div>
  );
};

const ActionStyled = styled.span`
  svg.filled path {
    fill: #000;
  }
`;

