import { AutoId } from "../core/utils";
import { APIResponse } from "@/pages/api/entities";
import { Resource, VITResource } from "../core/entities";
import { MetadataResponse } from "@/pages/api/metadata/entities";

export const fetchMetadataFromURL = async (url : string) : Promise<Resource> => {

  const response = await fetch(`/api/metadata?url=${url}`);
  const resourceMetadata = await response.json() as APIResponse;

  const id = AutoId.newId();

  if (!resourceMetadata.isOk) return new Resource({
    id,
    url: url,
    url_title: url,
    date_created: new Date().toISOString(),
    og_description: "",
  } as VITResource)

  return new Resource({
    id,
    date_created: new Date().toISOString(),
    url: (resourceMetadata.data as MetadataResponse)?.url,
    url_title: (resourceMetadata.data as MetadataResponse)?.title,
    og_image: (resourceMetadata.data as MetadataResponse)?.image,
    keyphrase: (resourceMetadata.data as MetadataResponse)?.image,
    og_title: (resourceMetadata.data as MetadataResponse)?.title,
    og_description: (resourceMetadata.data as MetadataResponse)?.description,
  } as VITResource)
};
