import { useFetch } from '../hooks/useFetchOAProjectsAPI2';
import { protectedResources } from '../config/apiConfig';
import { ShowModel } from '../models/ShowModel';
import { CodeValueModel } from '../models/CodeValueModel';
import { TransactionItemModel } from '../models/TransactionItemModel';
import { AddWatchFromSearchModel } from '../models/AddWatchFromSearchModel';
import { BingeWatchModel } from '../models/BingeWatchModel';

export const showApi = () => {
  const { getData, postData } = useFetch();

  const loadShow = async (take: number) => {
    let data: ShowModel[] = [];
    let count: number = 0;
    let showTypeIds: CodeValueModel[] = [];
    let items: TransactionItemModel[] = [];

    await getData(
      `${protectedResources.oaprojectsApi.showEndpoint}/load?take=${take}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.shows;
        count = json.model.count;
        showTypeIds = json.model.showTypeIds;
        items = json.model.transactionItems;
      }
    });

    return {
      data,
      count,
      showTypeIds,
      items,
    };
  };

  const getShow = async (page: number, take: number, search: string) => {
    let data: ShowModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.showEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.shows;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const saveShow = async (show: ShowModel) => {
    let data: ShowModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.showEndpoint}/save`,
      show,
    ).then(async json => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  const addWatchFromSearch = async (show: AddWatchFromSearchModel) => {
    let data: ShowModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.showEndpoint}/addwatchfromsearch`,
      show,
    ).then(async json => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  const deleteShow = async (showId: number) => {
    let success: boolean = false;
    await postData(`${protectedResources.oaprojectsApi.showEndpoint}/delete`, {
      showId: showId,
    }).then(async json => {
      if (json.errors.length == 0) {
        success = true;
      }
    });

    return success;
  };

  const addNextEpisode = async (showId: number, dateWatched: Date) => {
    let data: ShowModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.showEndpoint}/addnextepisode`,
      { showId, dateWatched },
    ).then(async json => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  const addOneday = async (showId: number) => {
    let data: ShowModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.showEndpoint}/addoneday`,
      {
        showId: showId,
      },
    ).then(async json => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  const subtractOneday = async (showId: number) => {
    let data: ShowModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.showEndpoint}/subtractoneday`,
      {
        showId: showId,
      },
    ).then(async json => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  const addRange = async (binge: BingeWatchModel) => {
    let success: boolean = false;
    await postData(
      `${protectedResources.oaprojectsApi.showEndpoint}/addrange`,
      binge,
    ).then(async json => {
      if (json.errors.length == 0) {
        success = true;
      }
    });
    return success;
  };

  return {
    loadShow,
    getShow,
    saveShow,
    addWatchFromSearch,
    deleteShow,
    addNextEpisode,
    addOneday,
    subtractOneday,
    addRange,
  };
};
