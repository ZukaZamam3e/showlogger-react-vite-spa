import { useDispatch } from 'react-redux';
import { useFetch } from '../hooks/useFetchOAProjectsAPI';
import { startLoading, stopLoading } from '../slices/isLoadingSlice';
import { showErrors } from '../slices/errorsSlice';
import { protectedResources } from '../config/apiConfig';
import { MovieInfoModel } from '../models/MovieInfoModel';

export const movieInfoApi = () => {
  const dispatch = useDispatch();
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
      } else {
        dispatch(showErrors(json.errors));
      }
    });

    return {
      data,
      count,
    };
  };

  const getMovieInfo = async (page: number, search: string, take: number) => {
    let data: MovieInfoModel[] = [];
    let count: number = 0;
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.movieInfoEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.movieInfos;
        count = json.model.count;
      } else {
        dispatch(showErrors(json.errors));
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
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .catch(() => {});

    return success;
  };

  return { loadMovieInfo, getMovieInfo, deleteMovieInfo };
};
