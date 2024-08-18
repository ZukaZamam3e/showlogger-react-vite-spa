import { useFetch } from '../hooks/useFetchOAProjectsAPI';
import { protectedResources } from '../config/apiConfig';
import { MovieInfoModel } from '../models/MovieInfoModel';

export const movieInfoApi = () => {
  const { getData, postData } = useFetch();

  const loadMovieInfo = async (take: number) => {
    let data: MovieInfoModel[] = [];
    let count: number = 0;
    await getData(
      `${protectedResources.oaprojectsApi.movieInfoEndpoint}/load?take=${take}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.movieInfos;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const getMovieInfo = async (page: number, take: number, search: string) => {
    let data: MovieInfoModel[] = [];
    let count: number = 0;
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.movieInfoEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.movieInfos;
        count = json.model.count;
      }
    });

    return { data, count };
  };

  const deleteMovieInfo = async (movieInfoId: number) => {
    let success: boolean = false;

    await postData(
      `${protectedResources.oaprojectsApi.movieInfoEndpoint}/delete`,
      {
        movieInfoId: movieInfoId,
      },
    )
      .then(async json => {
        if (json.errors.length == 0) {
          success = json.model;
        }
      })
      .catch(() => {});

    return success;
  };

  return { loadMovieInfo, getMovieInfo, deleteMovieInfo };
};
