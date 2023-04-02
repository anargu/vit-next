import { ONE_DAY_IN_MILLIS, ONE_HOUR_IN_MILLIS, ONE_MINUTE_IN_MILLIS, ONE_MONTH_IN_MILLIS } from "./constants";

export enum LinkPrivacy {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
};

export interface VITResource {
  id?: string;
  og_image : string | null,
  keyphrase : string | null,
  date_created : string,
  date_updated? : string,
  og_title : string | null,
  og_description : string | null,
  url_title: string | null,
  url: string,
  deleted? : boolean,
  is_public: boolean | null,
};

export interface JSONResource {
  id : string | null;
  createdAt: string;
  updatedAt: string;
  postedAt : string;
  deleted: boolean;
  isPublic: boolean;

  url: string;
  imageSrc : string | null;
  imageAlt : string | null;
  title : string | null;
  description : string | null;
}

export class Resource {
  id : string | null;
  createdAt: Date;
  updatedAt: Date;
  postedAt : Date;
  deleted: boolean;
  isPublic: boolean;

  url: string;
  imageSrc : string | null;
  imageAlt : string | null;
  title : string | null;
  description : string | null;

  constructor({ id, deleted, is_public, og_image, keyphrase, date_created, date_updated, og_title, url_title, og_description, url } : VITResource) {
    this.id = id ?? null;
    this.postedAt = new Date(date_created);
    this.createdAt = new Date(date_created);
    this.updatedAt = date_updated ? new Date(date_updated) : new Date();
    this.deleted = deleted ?? false;
    this.isPublic = is_public ?? false;

    this.imageSrc = og_image ?? null;
    this.imageAlt = keyphrase ?? null;

    this.url = url;
    this.title = og_title ?? url_title ?? url;
    this.description = og_description;
  }

  public set setIsPublic(newValue: boolean) {
    this.isPublic = newValue;
  }

  get isRegistered() : boolean {
    return this.id !== null;
  };

  get timeAgo() : SinceDatetimeField {
    return new SinceDatetimeField(this.createdAt);
  };

  static fromVITResource(data: VITResource) : Resource {
    return new Resource(data);
  };

  static fromJSONResource(data: JSONResource) : Resource {
    return new Resource({
      id: data.id ?? undefined,
      url: data.url,
      deleted: data.deleted,
      is_public: data.isPublic,
      og_image: data.imageSrc,
      keyphrase: data.imageAlt,
      date_created: data.createdAt,
      date_updated: data.updatedAt,
      og_title: data.title,
      url_title: data.url,
      og_description: data.description,
    })
  }

  toJSON() : JSONResource {
    const _resource = {
      id: this.id,
      url: this.url,
      title : this.title,
      deleted: this.deleted,
      isPublic: this.isPublic,
      imageAlt : this.imageAlt,
      imageSrc : this.imageSrc,
      description : this.description,
      postedAt : this.postedAt.toString(),
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };

    return _resource;
  }
};

export class SinceDatetimeField {

  value : string;

  constructor(date : Date | string | null) {
    if (typeof date === "string" || date === null) {
      this.value = "";
      return;
    } 

    const now = new Date();

    const diffTimeMillis = now.getTime() - date?.getTime();

    this.value = this.computeTime(diffTimeMillis);
  }

  computeTime (diffTimeMillis : number) : string {

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

  toString () : string { return this.value; }
}

export interface User {
  id : string;
  email : string;
  displayName : string;
}

export type AuthenticatedUser = User;


