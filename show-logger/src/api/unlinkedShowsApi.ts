import { useFetch } from '../hooks/useFetchOAProjectsAPI2';
import { protectedResources } from '../config/apiConfig';
import { UnlinkedShowModel } from '../models/UnlinkedShowModel';

export const unlinkedShowsApi = () => {
  const { getData, postData } = useFetch();

  const loadUnlinkedShows = async (take: number) => {
    let data: UnlinkedShowModel[] = [];
    let count: number = 0;

    await getData(
      `${protectedResources.oaprojectsApi.unlinkedShowsEndpoint}/load?take=${take}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.unlinkedShows;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const getUnlinkedShows = async (
    page: number,
    take: number,
    search: string,
  ) => {
    let data: UnlinkedShowModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.unlinkedShowsEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.unlinkedShows;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  return { loadUnlinkedShows, getUnlinkedShows };
};
