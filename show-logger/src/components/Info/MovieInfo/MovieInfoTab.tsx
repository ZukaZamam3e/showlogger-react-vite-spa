import { useDispatch } from 'react-redux';
import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showErrors } from '../../../slices/errorsSlice';
import { protectedResources } from '../../../config/apiConfig';
import { MovieInfoCard } from './MovieInfoCard';
import {
  MovieInfoModel,
  createNewMovieInfo,
} from '../../../models/MovieInfoModel';

export const MovieInfoTab = () => {
  const dispatch = useDispatch();

  const { getData, postData } = useFetch();
  const [movieInfos, setMovieInfos] = useState<MovieInfoModel[]>([]);
  const [movieInfoCount, setMovieInfoCount] = useState<number>(0);
  const [clearSearch, setClearSearch] = useState(false);
  const take = 12;

  const load = async () => {
    dispatch(startLoading());
    await getData(
      `${protectedResources.oaprojectsApi.movieInfoEndpoint}/load?take=${take}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setMovieInfos(json.model.movieInfos);
          setMovieInfoCount(json.model.count);
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  const get = async (page: number, search: string) => {
    dispatch(startLoading());
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.movieInfoEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setMovieInfos(json.model.movieInfos);
          setMovieInfoCount(json.model.count);
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  useEffect(() => {
    load();
  }, []);

  const handleDeleteMovieInfo = async (movieInfoId: number) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.movieInfoEndpoint}/delete`,
      {
        movieInfoId: movieInfoId,
      },
    )
      .then(async json => {
        if (json.errors.length == 0) {
          await get(0, '');
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(stopLoading());
      });

    await get(0, '');
  };

  const body = (
    <div>
      <List
        count={movieInfoCount}
        onGet={get}
        clearSearch={clearSearch}
        take={take}
      >
        {movieInfos.map((movieInfo: MovieInfoModel) => (
          <MovieInfoCard
            key={movieInfo.movieInfoId}
            movieInfo={movieInfo}
            onDeleteMovieInfo={handleDeleteMovieInfo}
          />
        ))}
      </List>
    </div>
  );

  return <>{body}</>;
};
