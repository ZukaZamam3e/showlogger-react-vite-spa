import { useDispatch } from 'react-redux';
import { useFetch } from '../hooks/useFetchOAProjectsAPI2';
import { showErrors } from '../slices/errorsSlice';
import { protectedResources } from '../config/apiConfig';
import { TvEpisodeInfoModel } from '../models/TvEpisodeInfoModel';
import { TvInfoModel } from '../models/TvInfoModel';

export const tvInfoApi = () => {
  const { getData, postData } = useFetch();

  const loadTvInfo = async (take: number) => {
    let data: TvInfoModel[] = [];
    let count: number = 0;

    await getData(
      `${protectedResources.oaprojectsApi.tvInfoEndpoint}/load?take=${take}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.tvInfos;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const getTvInfo = async (page: number, search: string, take: number) => {
    let data: TvInfoModel[] = [];
    let count: number = 0;

    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.tvInfoEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.tvInfos;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const deleteTvInfo = async (tvInfoId: number) => {
    let success: boolean = false;
    await postData(
      `${protectedResources.oaprojectsApi.tvInfoEndpoint}/delete`,
      {
        tvInfoId: tvInfoId,
      },
    ).then(async json => {
      if (json.errors.length == 0) {
        success = json.model;
      }
    });

    return success;
  };

  const getTvInfoEpisodes = async (
    tvInfoId: number,
    seasonNumber: number,
    take: number,
    search?: string,
  ) => {
    let data: TvEpisodeInfoModel[] = [];
    await getData(
      `${protectedResources.oaprojectsApi.tvInfoEndpoint}/getepisodes?` +
        `tvInfoId=${tvInfoId}` +
        `&seasonNumber=${seasonNumber}` +
        `&search=${search}` +
        `&take=${take}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.tvEpisodeInfos;
      }
    });

    return data;
  };

  return {
    loadTvInfo,
    getTvInfo,
    deleteTvInfo,
    getTvInfoEpisodes,
  };
};
