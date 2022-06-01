import { IResourceRepository } from "src/repository/IResourceRepository";

export const executeSearch = async (
  repository : IResourceRepository,
  searchTerm : String) => {

    if ((!searchTerm) || searchTerm === "") {
      return await repository.fetchAll();
    }
};


