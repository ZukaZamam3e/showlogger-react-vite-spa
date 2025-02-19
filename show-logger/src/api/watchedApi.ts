import { useFetch } from '../hooks/useFetchOAProjectsAPI';
import { protectedResources } from '../config/apiConfig';
import { WatchedModel } from '../models/WatchedModel';
import { CreatedWatchedModel } from '../models/CreatedWatchedModel';

export const watchedApi = () => {
  const { getData, postData } = useFetch();

  const loadTV = async (take: number) => {
    let data: WatchedModel[] = [];
    let count: number = 0;

    await getData(
      `${protectedResources.oaprojectsApi.watchedEndpoint}/loadtv?take=${take}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.items;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const getTV = async (page: number, take: number, search: string) => {
    let data: WatchedModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.watchedEndpoint}/gettv?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.items;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const loadMovies = async (take: number) => {
    let data: WatchedModel[] = [];
    let count: number = 0;

    await getData(
      `${protectedResources.oaprojectsApi.watchedEndpoint}/loadmovies?take=${take}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.items;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const getMovies = async (page: number, take: number, search: string) => {
    let data: WatchedModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.watchedEndpoint}/getmovies?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.items;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const createWatched = async (subscription: CreatedWatchedModel) => {
    let data: CreatedWatchedModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.whatsNextEndpoint}/createwatched`,
      subscription,
    ).then(async json => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  const saveWatched = async (item: WatchedModel) => {
    let data: WatchedModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.watchedEndpoint}/save`,
      item,
    ).then(async json => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  const deleteWatched = async (itemId: number) => {
    let success: boolean = false;
    await postData(
      `${protectedResources.oaprojectsApi.watchedEndpoint}/delete`,
      {
        itemId: itemId,
      },
    ).then(async json => {
      if (json.errors.length == 0) {
        success = true;
      }
    });

    return success;
  };

  return {
    loadTV,
    getTV,
    loadMovies,
    getMovies,
    createWatched,
    saveWatched,
    deleteWatched,
  };
};
