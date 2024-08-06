import { useEffect, useState } from 'react';
import { TvStatModel } from '../../../models/TvStatModel';
import { protectedResources } from '../../../config/apiConfig';
import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
import { TvStatCard } from './TvStatCard';
import { List } from '../../Common/List';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showErrors } from '../../../slices/errorsSlice';
import { statApi } from '../../../api/statApi';

export const TvStatsTab = () => {
  const { getTvStats } = statApi();
  const dispatch = useDispatch();
  const { getData, postData } = useFetch();
  const [tvStats, setTvStats] = useState<TvStatModel[]>([]);
  const [tvStatsCount, setTvStatsCount] = useState<number>(0);
  const [clearSearch, setClearSearch] = useState(false);
  const take = 12;

  const get = async (page: number, search: string) => {
    const { data, count } = await getTvStats(page, take, search);
    setTvStats(data);
    setTvStatsCount(count);
  };

  const handleAddNextEpisode = async (showId: number) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
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
          dispatch(showErrors(json.errors));
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(stopLoading());
      });

    await get(0, '');
  };

  useEffect(() => {
    get(0, '');
  }, []);

  return (
    <List
      count={tvStatsCount}
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
  );
};
