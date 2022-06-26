import { Resource, VITResource } from "../../core/entities";
import Image from "next/image"
import { useMemo } from "react";
import styled from 'styled-components';
import Link from "../../../public/assets/link.svg";
import Bookmark from "../../../public/assets/bookmark.svg";
import Share from "../../../public/assets/share.svg";

export type ResourceCardProps = {
  hit: VITResource,
};

export const ResourceCard = ({ hit } : ResourceCardProps) => {

  const resourceData = useMemo(() => Resource.fromVITResource(hit), [hit]);

  return (
    <div className="relative py-4 px-4 text-white h-full">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/60 z-20">
      </div>
      <div className="absolute top-0 right-0 bottom-0 left-0 z-10">
        <Image src={resourceData.imageSrc} alt={resourceData.imageAlt} layout="fill"/>
      </div>

      <div className="relative z-30 h-full grid grid-rows-[min-content_2fr_1fr_36px] gap-5">
        <div className="text-right"><span>{resourceData.timeAgo.toString()}</span></div>

        <p className={`py-0 max-h-[calc(2.5rem*4)]
          text-4xl text-multiline-overflow-mixin
          text-ellipsis [-webkit-line-clamp:4]`}>{resourceData.title}</p>

        <p className="self-center max-h-[calc(2rem*4)] text-2xl text-multiline-overflow-mixin text-ellipsis [-webkit-line-clamp:2]">{resourceData.description}</p>
        <ActionsStyled className="flex justify-around">
          <Link/>
          <Bookmark/>
          <Share/>
        </ActionsStyled>
      </div>
    </div>
  );
};

const ActionsStyled = styled.div`
  svg path {
    stroke: #FFF;
  }
`;
