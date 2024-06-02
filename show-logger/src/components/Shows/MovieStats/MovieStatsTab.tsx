import { useEffect, useState } from 'react';
import { protectedResources } from '../../../config/apiConfig';
import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
import { MovieStatCard } from './MovieStatCard';
import { MovieStatModel } from '../../../models/MovieStatModel';
import { List } from '../../Common/List';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showErrors } from '../../../slices/errorsSlice';

export const MovieStatsTab = () => {
  const dispatch = useDispatch();
  const { getData } = useFetch();
  const [movieStats, setMovieStats] = useState<MovieStatModel[]>([]);
  const [movieStatsCount, setMovieStatsCount] = useState<number>(0);
  const take = 12;

  const get = async (page: number, search: string) => {
    dispatch(startLoading());
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.statEndpoint}/getmoviestats?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setMovieStats(json.model.movieStats);
          setMovieStatsCount(json.model.count);
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  useEffect(() => {
    get(0, '');
  }, []);

  return (
    <List count={movieStatsCount} onGet={get} take={take}>
      {movieStats.map((movieStat: MovieStatModel) => (
        <MovieStatCard key={movieStat.showId} movieStat={movieStat} />
      ))}
    </List>
  );
};
