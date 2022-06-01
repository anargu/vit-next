import { Resource } from "./entities";
import { IResourceRepository } from "./IResourceRepository"

export class InMemoryRepository extends IResourceRepository {

  data : Resource[] = [];

  async fetchAll(): Promise<Resource[]> {
    return this.data;
  }
}
