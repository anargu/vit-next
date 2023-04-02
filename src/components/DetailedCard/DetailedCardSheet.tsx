import { useRef } from "react";

import { DetailedCard } from "./DetailedCard";
import { Resource } from "@/src/core/entities";
import { SheetWrapper } from "../SheetWrapper/SheetWrapper";
import { DeleteResourceFn, SaveResourceFn } from "@/src/hooks/useLinks";

export type DetailedCardSheetProps = {
  /* resourceId: string | null; */
  isSaved?: boolean,
  onClose?: () => void,
  resource: Resource | null;
  showPrivacySetting?: boolean,
  onSaveClicked?: SaveResourceFn | DeleteResourceFn,
};

export const DetailedCardSheet = ({ resource : hit, ...props } : DetailedCardSheetProps) => {
  const detailedCardRef = useRef<any>(null);
  const unsubscribeLinkListener = useRef<any>(null);

  const close = () => {
    unsubscribeLinkListener.current?.();

    props.onClose?.();
  };

  return <SheetWrapper
    show={!!hit}
    onBackgroundClicked={close}
    onCloseSheet={close}>
    {hit
      ? (<DetailedCard
        showPrivacySetting={props.showPrivacySetting}
        innerRef={detailedCardRef}
        hit={hit}
        isSaved={props.isSaved}
        onSaveClicked={props.onSaveClicked}
      />)
      : (<div className="bg-white py-10 text-center">
        <span className="text-black text-2xl">&bull; &bull; &bull;</span>
      </div>)}
  </SheetWrapper>
};

