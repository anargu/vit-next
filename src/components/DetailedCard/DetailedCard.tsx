import { LinkPrivacy, Resource } from "@/src/core/entities";
import { MutableRefObject, ReactNode, useState } from "react";
import styled from "styled-components";
import Bookmark from "../../../public/assets/bookmark.svg";
import Trash from "../../../public/assets/trash.svg";
import Share from "../../../public/assets/share.svg";
import { useResource } from "@/src/hooks/useResource";
import { showDefaultNotification, showNotification } from "../Notification/Notification";
import { CloneResourceFn, DeleteResourceFn, SaveResourceFn, useLinks } from "@/src/hooks/useLinks";
import { PrivacySetting } from "../ResourceCard/PrivacySetting";
import { Loader } from "@mantine/core";

export type DetailedCardProps = {
  resource: Resource,
  isSaved?: boolean,
  onSaveClicked?: SaveResourceFn | CloneResourceFn,
  onDeleteClicked?: DeleteResourceFn,
  showPrivacySetting?: boolean,
};

const OutlineButton = (props : { children: ReactNode, onClick?: any }) => (
  <button
    className="px-2 py-1 outline-none rounded-md border-2 border-gray-800"
    onClick={props.onClick}
  >{props.children}</button>
);

export const DetailedCard = (props : DetailedCardProps) => {
  const { share } = useResource();
  const { updateLinkPrivacy } = useLinks();

  const [isLoading, setIsLoading] = useState(false);
  const [resource, setResource] = useState(props.resource);

  const onSaveClicked = async () => {
    if (!props.isSaved && !props.onSaveClicked) return showNotification("Error", "Function not available yet.", { color: "red" });
    if (props.isSaved && !props.onDeleteClicked) return showNotification("Error", "Function not available yet.", { color: "red" });

    setIsLoading(true);
    try {
      const promiseUpdateResource = props.isSaved
        ? props.onDeleteClicked?.(resource.id!)
        : props.onDeleteClicked?.(resource.id!);

      await promiseUpdateResource;

      showDefaultNotification(props.isSaved ? "Link unsaved." : "Link saved locally.");

    } catch (error : any) {
      showNotification(
        error?.message ?? "Something went wrong",
        "Error",
        { color: "red", }
      );
    }
    setIsLoading(false);
  };

  const onUpdatePrivacy = async (newValue : boolean) => {
    try {
      setIsLoading(true);
      setResource({...resource, isPublic: newValue } as Resource);

      await updateLinkPrivacy(props.resource.id ?? "", newValue ? LinkPrivacy.PUBLIC : LinkPrivacy.PRIVATE);

      showDefaultNotification("Privacy updated.");
    } catch (error: any) {
      showNotification(
        error?.message ?? "Something went wrong",
        "Error",
        { color: "red", }
      );
    }

    setIsLoading(false);
  };

  const ActionBar = () => (
    <div className="grid grid-cols-[100px_40px_auto_210px]">
      <OutlineButton onClick={() => {
        if (!props.resource.url) return;
        if (typeof window === "undefined") return;

        window.open(props.resource.url, "_blank");
      }}>Visit Site</OutlineButton>
      <div className="flex justify-center items-center px-2">
        {isLoading ? (<Loader color="dark" size="sm" />) : null}
      </div>
      <div />
      <div className="inline-flex justify-between items-center">
        {/* Make it public option */}
        {props.showPrivacySetting
          ? <ActionStyled title="Privacy setting">
              <PrivacySetting
                isDisabled={isLoading}
                isPublic={resource.isPublic}
                onChangePrivacy={onUpdatePrivacy}
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

            share(resource);
          }}><Share /></ActionStyled>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mx-6 py-4"><ActionBar /></div>
      <div className="bg-stone-200 text-center h-[160px]">
        {resource.imageSrc && (
          <img className="inline-block h-full max-h-[220px]" alt={resource.imageAlt || ""} src={resource.imageSrc} />
        )}
      </div>
      <div className="relative mx-6 mb-8 max-h-[400px] min-h-[300px] overflow-hidden">
        <h1 className="mb-2 mt-4 mx-0 text-2xl">{resource.title}</h1>
        <p>{resource.description}</p>
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

