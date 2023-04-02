import { LinkPrivacy, Resource, User } from "../core/entities";

export abstract class ResourcesStorageStrategy {
  abstract insert(data: Resource, by?: User | null): Promise<void>;
  abstract updateLinkPrivacy(resourceId: string, privacy: LinkPrivacy): Promise<void>;
  abstract delete(resourceId: string): Promise<void>;

  // Evaluate whether delete or not this fn.
  /* abstract readAll(): Promise<Resource[]>; */

  /* abstract listenLinkById(): Promise<Resource[]>; */
  /* abstract listenFeedLinks(): Promise<Resource[]>; */

  /* abstract listenLinksbyUserId( */
  /*   id : string, */
  /*   onSnapshotCallback : (resources : Resource[]) => void */
  /* ): any; */
}

