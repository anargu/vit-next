import Image from "next/image"
import { useMemo } from "react";

export const ONE_MINUTE_IN_MILLIS = (1 * 60 * 1000);
export const ONE_HOUR_IN_MILLIS = 60 * ONE_MINUTE_IN_MILLIS;
export const ONE_DAY_IN_MILLIS = 24 * ONE_HOUR_IN_MILLIS;
export const ONE_MONTH_IN_MILLIS = 30 * ONE_DAY_IN_MILLIS;

export type VITResource = {
  imageSrc : string,
  imageAlt : string,
  postedAt : Date | string,
  title : string,
  description : string,
};

export type ResourceCardProps = {
  hit: VITResource,
};

export const computeTime = (diffTimeMillis : number) : string => {

  if (diffTimeMillis < ONE_MINUTE_IN_MILLIS)
    return "now";

  if (diffTimeMillis < ONE_HOUR_IN_MILLIS)
    return `${Math.floor(diffTimeMillis / ONE_MINUTE_IN_MILLIS)} m ago`;

  if (diffTimeMillis < ONE_DAY_IN_MILLIS)
    return `${Math.floor(diffTimeMillis / ONE_HOUR_IN_MILLIS)} h ago`;

  if (diffTimeMillis < ONE_MONTH_IN_MILLIS)
    return `${Math.floor(diffTimeMillis / ONE_DAY_IN_MILLIS)} days ago`;

  return `${Math.floor(diffTimeMillis / ONE_MONTH_IN_MILLIS)} months ago`;
}

export const ResourceCard = ({ hit : data } : ResourceCardProps) => {

  const postedAt = useMemo(() => {
    if (typeof data.postedAt === "string") return "";

    const now = new Date();

    const diffTime = now.getTime() - data.postedAt.getTime();

    return computeTime(diffTime)
  }, [data.postedAt]);

  return (
    <div>
      <Image src={data.imageSrc} alt={data.imageAlt} layout="fill"/>
      <div><span>{postedAt}</span></div>
      <p>{data.title}</p>
      <div className="flex items-around">
        <Image src="/assets/link.svg" width="24px" height="24px" />
        <Image src="/assets/bookmark.svg" width="24px" height="24px" />
        <Image src="/assets/share.svg" width="24px" height="24px"/>
      </div>
    </div>
  );
};
