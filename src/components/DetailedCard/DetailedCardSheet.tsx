import { Resource } from "@/src/core/entities";
import { SaveResourceFn, UpdatePrivacySettingFn } from "@/src/hooks/useSavedResources";
import { listenLinkByID } from "@/src/services/datasource";
import { useEffect, useRef, useState } from "react";
import { SheetWrapper } from "../SheetWrapper/SheetWrapper";
import { DetailedCard } from "./DetailedCard";

export type DetailedCardSheetProps = {
  resourceId: string | null;
  isSaved?: boolean,
  onSaveClicked?: SaveResourceFn,
  onClose?: () => void,
  showPrivacySetting?: boolean,
  onUpdatePrivacySetting?: UpdatePrivacySettingFn,
};

export const DetailedCardSheet = (props : DetailedCardSheetProps) => {
  const detailedCardRef = useRef<any>(null);
  const unsubscribeLinkListener = useRef<any>(null);

  const [hit, setHit] = useState<Resource | null>(null);

  useEffect(() => {
    if (!props.resourceId) return;

    const unSub = listenLinkByID(props.resourceId, (resource) => setHit(resource));

    unsubscribeLinkListener.current = unSub;

    return () => {
      unSub?.();
    }
  }, [props.resourceId]);
  
  const close = () => {
    unsubscribeLinkListener.current?.();

    setHit(null);

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
        onUpdatePrivacySetting={props.onUpdatePrivacySetting}
      />)
      : (<div className="bg-white py-10 text-center">
        <span className="text-black text-2xl">&bull; &bull; &bull;</span>
      </div>)}
  </SheetWrapper>
};

