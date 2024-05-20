import { useEffect, useState } from 'react';
import { TvStatModel } from '../../models/TvStatModel';
import { protectedResources } from '../../config/apiConfig';
import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { ErrorMessage } from '../ErrorMessage';
import { Backdrop, CircularProgress } from '@mui/material';
import { TvStatCard } from './TvStatCard';
import { List } from '../List';

interface TvStatsTabProps {
  isMobile: boolean;
}

export const TvStatsTab = (props: TvStatsTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getData, postData } = useFetch();
  const [tvStats, setTvStats] = useState<TvStatModel[]>([]);
  const [tvStatsCount, setTvStatsCount] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const take = 12;

  const get = async (page: number, search: string) => {
    setIsLoading(true);
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.statEndpoint}/gettvstats?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setTvStats(json.model.tvStats);
          setTvStatsCount(json.model.count);
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

  const handleAddNextEpisode = async (showId: number) => {
    setClearSearch(prev => !prev);
    setIsLoading(true);
    await postData(
      `${protectedResources.oaprojectsApi.showEndpoint}/addNextEpisode`,
      {
        showId: showId,
        dateWatched: new Date(),
      },
    )
      .then(data => (data ? data.json() : null))
      .then(async json => {
        if (json.errors.length == 0) {
          await get(0, '');
        } else {
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });

    await get(0, '');
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
        count={tvStatsCount}
        isMobile={props.isMobile}
        onGet={get}
        clearSearch={clearSearch}
        take={take}
      >
        {tvStats.map((tvStat: TvStatModel) => (
          <TvStatCard
            key={tvStat.showId}
            tvStat={tvStat}
            onAddNextEpisode={handleAddNextEpisode}
          />
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
