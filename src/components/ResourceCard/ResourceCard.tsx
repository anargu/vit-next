import { Resource, VITResource } from "@/src/core/entities";
import Image from "next/image"
import { useMemo } from "react";

export type ResourceCardProps = {
  hit: VITResource,
};

export const ResourceCard = ({ hit : vitResourceData } : ResourceCardProps) => {

  const resourceData = useMemo(() => Resource.fromVITResource(vitResourceData), [vitResourceData]);

  return (
    <div>
      <Image src={resourceData.imageSrc} alt={resourceData.imageAlt} layout="fill"/>
      <div><span>{resourceData.timeAgo.toString()}</span></div>
      <p>{resourceData.title}</p>
      <div className="flex items-around">
        <Image src="/assets/link.svg" width="24px" height="24px" />
        <Image src="/assets/bookmark.svg" width="24px" height="24px" />
        <Image src="/assets/share.svg" width="24px" height="24px"/>
      </div>
    </div>
  );
};
