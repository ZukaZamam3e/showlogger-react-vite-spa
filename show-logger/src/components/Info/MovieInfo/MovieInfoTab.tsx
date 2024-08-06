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
import { movieInfoApi } from '../../../api/movieInfoApi';

export const MovieInfoTab = () => {
  const { loadMovieInfo, getMovieInfo, deleteMovieInfo } = movieInfoApi();
  const [movieInfos, setMovieInfos] = useState<MovieInfoModel[]>([]);
  const [movieInfoCount, setMovieInfoCount] = useState<number>(0);
  const [clearSearch, setClearSearch] = useState(false);
  const take = 12;

  const load = async () => {
    const { data, count } = await loadMovieInfo(take);
    setMovieInfos(data);
    setMovieInfoCount(count);
  };

  const get = async (page: number, search: string) => {
    const { data, count } = await getMovieInfo(page, take, search);
    setMovieInfos(data);
    setMovieInfoCount(count);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDeleteMovieInfo = async (movieInfoId: number) => {
    setClearSearch(prev => !prev);
    const success = await deleteMovieInfo(movieInfoId);

    if (success) {
      await get(0, '');
    }
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
