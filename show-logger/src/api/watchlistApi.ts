import { useFetch } from '../hooks/useFetchOAProjectsAPI2';
import { protectedResources } from '../config/apiConfig';
import { WatchListModel } from '../models/WatchListModel';
import { CodeValueModel } from '../models/CodeValueModel';

export const watchListApi = () => {
  const { getData, postData } = useFetch();

  const loadWatchList = async (take: number) => {
    let data: WatchListModel[] = [];
    let count: number = 0;
    let showTypeIds: CodeValueModel[] = [];

    await getData(
      `${protectedResources.oaprojectsApi.watchlistEnpoint}/load?take=${take}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.watchLists;
        count = json.model.count;
        showTypeIds = json.model.showTypeIds;
      }
    });

    return {
      data,
      count,
      showTypeIds,
    };
  };

  const getWatchList = async (page: number, take: number, search: string) => {
    let data: WatchListModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.watchlistEnpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.watchLists;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const saveWatchList = async (watchlist: WatchListModel) => {
    let data: WatchListModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.watchlistEnpoint}/save`,
      watchlist,
    ).then(async json => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  const deleteWatchList = async (watchlistId: number) => {
    let success: boolean = false;
    await postData(
      `${protectedResources.oaprojectsApi.watchlistEnpoint}/delete`,
      {
        watchlistId: watchlistId,
      },
    ).then(async json => {
      if (json.errors.length == 0) {
        success = true;
      }
    });

    return success;
  };

  const moveToShows = async (watchlistId: number, dateWatched: Date) => {
    let success: boolean = false;
    await postData(
      `${protectedResources.oaprojectsApi.watchlistEnpoint}/movetoshows`,
      {
        watchlistId: watchlistId,
        dateWatched: dateWatched,
      },
    ).then(async json => {
      if (json.errors.length == 0) {
        success = true;
      }
    });

    return success;
  };

  return {
    loadWatchList,
    getWatchList,
    saveWatchList,
    deleteWatchList,
    moveToShows,
  };
};
