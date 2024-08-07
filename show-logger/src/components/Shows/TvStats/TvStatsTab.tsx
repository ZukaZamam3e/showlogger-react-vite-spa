import { useEffect, useState } from 'react';
import { TvStatModel } from '../../../models/TvStatModel';
import { TvStatCard } from './TvStatCard';
import { List } from '../../Common/List';
import { statApi } from '../../../api/statApi';
import { showApi } from '../../../api/showApi';

export const TvStatsTab = () => {
  const { getTvStats } = statApi();
  const { addNextEpisode } = showApi();
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

    const updatedShow = await addNextEpisode(showId, new Date());

    if (updatedShow != null) {
      await get(0, '');
    }
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
