import { ONE_DAY_IN_MILLIS, ONE_HOUR_IN_MILLIS, ONE_MINUTE_IN_MILLIS, ONE_MONTH_IN_MILLIS } from "./constants";

export interface Resource {
  id: string;
}

export interface VITResource {
  id: string;
  imageSrc : string,
  imageAlt : string,
  postedAt : Date | string,
  title : string,
  description : string,
};

export class Resource {

  id : string;
  imageSrc : string;
  imageAlt : string;
  postedAt : string | Date;
  title : string;
  description : string;

  constructor({ id, imageSrc, imageAlt, postedAt, title, description} : VITResource) {
    this.id = id;
    this.imageSrc = imageSrc;
    this.imageAlt = imageAlt;
    this.postedAt = postedAt;
    this.title = title;
    this.description = description;
  }

  get timeAgo() : SinceDatetimeField {
    return new SinceDatetimeField(this.postedAt);
  };

  static fromVITResource (data : VITResource) : Resource {
    return new Resource(data);
  };
};

export class SinceDatetimeField {

  value : string;

  constructor(date : Date | string) {
    if (typeof date === "string") {
      this.value = "";
      return;
    } 

    const now = new Date();

    const diffTimeMillis = now.getTime() - date.getTime();

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

