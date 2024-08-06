import { useEffect, useState } from 'react';
import { MovieStatCard } from './MovieStatCard';
import { MovieStatModel } from '../../../models/MovieStatModel';
import { List } from '../../Common/List';
import { statApi } from '../../../api/statApi';

export const MovieStatsTab = () => {
  const { getMovieStats } = statApi();
  const [movieStats, setMovieStats] = useState<MovieStatModel[]>([]);
  const [movieStatsCount, setMovieStatsCount] = useState<number>(0);
  const take = 12;

  const get = async (page: number, search: string) => {
    const { data, count } = await getMovieStats(page, take, search);
    setMovieStats(data);
    setMovieStatsCount(count);
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
