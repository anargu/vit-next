import { Resource } from "./entities";

export abstract class IResourceRepository {

  abstract fetchAll() : Promise<Resource[]>;
}
