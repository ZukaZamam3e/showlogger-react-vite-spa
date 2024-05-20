import { useEffect, useState } from 'react';
import { protectedResources } from '../../config/apiConfig';
import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { ErrorMessage } from '../ErrorMessage';
import { Backdrop, CircularProgress } from '@mui/material';
import { MovieStatCard } from './MovieStatCard';
import { MovieStatModel } from '../../models/MovieStatModel';
import { List } from '../List';

interface MovieStatsTabProps {
  isMobile: boolean;
}

export const MovieStatsTab = (props: MovieStatsTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getData } = useFetch();
  const [movieStats, setMovieStats] = useState<MovieStatModel[]>([]);
  const [movieStatsCount, setMovieStatsCount] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);
  const take = 12;

  const get = async (page: number, search: string) => {
    setIsLoading(true);
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.statEndpoint}/getmoviestats?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setMovieStats(json.model.movieStats);
          setMovieStatsCount(json.model.count);
        } else {
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    get(0, '');
  }, []);

  const handleCloseErrors = () => {
    setErrors([]);
    setHasError(false);
  };

  return (
    <>
      <List
        count={movieStatsCount}
        isMobile={props.isMobile}
        onGet={get}
        take={take}
      >
        {movieStats.map((movieStat: MovieStatModel) => (
          <MovieStatCard key={movieStat.showId} movieStat={movieStat} />
        ))}
      </List>
      <ErrorMessage
        open={hasError}
        onClose={handleCloseErrors}
        errors={errors}
      />
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
