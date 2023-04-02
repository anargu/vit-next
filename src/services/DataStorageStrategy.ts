import { LinkPrivacy, Resource, User } from "../core/entities";

export abstract class ResourcesStorageStrategy {
  // Insert new Resource to DB.
  abstract insert(data: Resource, by?: User | null): Promise<void>;
  abstract cloneIfNonExists(data: Resource, by?: User | null): Promise<void>;
  abstract updateLinkPrivacy(resourceId: string, privacy: LinkPrivacy): Promise<void>;
  abstract delete(resourceId: string): Promise<void>;
}

