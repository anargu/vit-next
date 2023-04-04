import { useRef } from "react";

import { DetailedCard, DetailedCardProps } from "./DetailedCard";
import { Resource } from "@/src/core/entities";
import { SheetWrapper } from "../SheetWrapper/SheetWrapper";

export type DetailedCardSheetProps = Omit<DetailedCardProps, "resource">  & {
  onClose?: () => void,
  resource: Resource | null;
};

export const DetailedCardSheet = ({ resource, ...props } : DetailedCardSheetProps) => {
  const unsubscribeLinkListener = useRef<any>(null);

  const close = () => {
    unsubscribeLinkListener.current?.();

    props.onClose?.();
  };

  return <SheetWrapper
    show={!!resource}
    onBackgroundClicked={close}
    onCloseSheet={close}>
    {resource
      ? (<DetailedCard
        resource={resource}
        isSaved={props.isSaved}
        onSaveClicked={props.onSaveClicked}
        onDeleteClicked={props.onDeleteClicked}
        showPrivacySetting={props.showPrivacySetting}
      />)
      : (<div className="bg-white py-10 text-center">
        <span className="text-black text-2xl">&bull; &bull; &bull;</span>
      </div>)}
  </SheetWrapper>
};

