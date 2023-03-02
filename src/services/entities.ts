import { Resource } from "../core/entities";
import { Timestamp } from "../firebase";

export type Link = {
  id : string | null;
  deleted: boolean;
  isPublic: boolean | undefined;

  createdAt: Timestamp;
  updatedAt: Timestamp;
  postedAt : Timestamp;

  url: string;
  imageSrc : string | null;
  imageAlt : string | null;
  title : string | null;
  description : string | null;
};

export class DataTransformer {
  static fromLinktoResource(srcData : Link) : Resource {

    const resource = new Resource({
      id: srcData.id ?? undefined,
      date_created : srcData.createdAt.toDate().toUTCString(),
      date_updated : srcData.updatedAt.toDate().toUTCString(),
      deleted: srcData.deleted,
      is_public: srcData.isPublic ?? false,

      og_image : srcData.imageSrc,
      keyphrase : srcData.imageAlt,
      og_title : srcData.title,
      og_description : srcData.description,
      url_title: srcData.title,
      url: srcData.url,
    });

    return resource;
  }
}
