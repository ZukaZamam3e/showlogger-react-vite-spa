import { useFetch } from '../hooks/useFetchOAProjectsAPI2';
import { protectedResources } from '../config/apiConfig';
import { BookYearStatModel } from '../models/BookYearStatModel';
import { TvStatModel } from '../models/TvStatModel';
import { MovieStatModel } from '../models/MovieStatModel';
import { YearStatDataModel } from '../models/YearStatDataModel';
import { YearStatModel } from '../models/YearStatModel';

export const statApi = () => {
  const { getData } = useFetch();

  const getTvStats = async (page: number, take: number, search: string) => {
    let data: TvStatModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.statEndpoint}/gettvstats?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.tvStats;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const getMovieStats = async (page: number, take: number, search: string) => {
    let data: MovieStatModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.statEndpoint}/getmoviestats?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.movieStats;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const getYearStats = async (page: number, take: number, search: string) => {
    let data: YearStatModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.statEndpoint}/getyearstats?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.yearStats;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const getBookYearStats = async (
    page: number,
    take: number,
    search: string,
  ) => {
    let data: BookYearStatModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.statEndpoint}/getbookyearstats?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.bookYearStats;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  return { getTvStats, getMovieStats, getYearStats, getBookYearStats };
};
