import { protectedResources } from '../config/apiConfig';
import { useFetch } from '../hooks/useFetchOAProjectsAPI';
import { CreateSubscriptionModel } from '../models/CreateSubscriptionModel';
import { WhatsNextShowModel } from '../models/WhatsNextShowModel';
import { WhatsNextSubModel } from '../models/WhatsNextSubModel';

export const whatsNextApi = () => {
  const { getData, postData } = useFetch();

  const loadWhatsNext = async (take: number) => {
    let data: WhatsNextShowModel[] = [];
    let count: number = 0;

    await getData(
      `${protectedResources.oaprojectsApi.whatsNextEndpoint}/load?take=${take}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.whatsNext;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const getWhatsNext = async (page: number, take: number, search: string) => {
    let data: WhatsNextShowModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.whatsNextEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.whatsNext;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const loadSubscriptions = async (take: number) => {
    let data: WhatsNextSubModel[] = [];
    let count: number = 0;

    await getData(
      `${protectedResources.oaprojectsApi.whatsNextEndpoint}/loadSubscriptions?take=${take}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.subscriptions;
        count = json.model.subscriptionCount;
      }
    });

    return {
      data,
      count,
    };
  };

  const getSubscriptions = async (
    page: number,
    take: number,
    search: string,
  ) => {
    let data: WhatsNextSubModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.whatsNextEndpoint}/getsubscriptions?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.subscriptions;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const createSubscription = async (subscription: CreateSubscriptionModel) => {
    let data: CreateSubscriptionModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.whatsNextEndpoint}/createsubscription`,
      subscription,
    ).then(async json => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  const saveWhatsNext = async (whatsNext: WhatsNextSubModel) => {
    let data: WhatsNextShowModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.whatsNextEndpoint}/save`,
      whatsNext,
    ).then(async json => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  const deleteWhatsNext = async (whatsNextSubId: number) => {
    let success: boolean = false;
    await postData(
      `${protectedResources.oaprojectsApi.whatsNextEndpoint}/delete`,
      {
        whatsNextSubId: whatsNextSubId,
      },
    ).then(async json => {
      if (json.errors.length == 0) {
        success = true;
      }
    });

    return success;
  };

  const watchEpisode = async (tvEpisodeInfoId: number, dateWatched: Date) => {
    let showId: number = -1;
    await postData(
      `${protectedResources.oaprojectsApi.whatsNextEndpoint}/watchepisode`,
      { tvEpisodeInfoId, dateWatched },
    ).then(async json => {
      if (json.errors.length == 0) {
        showId = json.model;
      }
    });

    return showId;
  };

  return {
    loadWhatsNext,
    getWhatsNext,
    loadSubscriptions,
    getSubscriptions,
    createSubscription,
    saveWhatsNext,
    deleteWhatsNext,
    watchEpisode,
  };
};
