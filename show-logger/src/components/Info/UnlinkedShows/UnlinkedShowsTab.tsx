import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { UnlinkedShowModel } from '../../../models/UnlinkedShowModel';
import { UnlinkedShowCard } from './UnlinkedShowCard';
import { unlinkedShowsApi } from '../../../api/unlinkedShowsApi';

export const UnlinkedShowsTab = () => {
  const { loadUnlinkedShows, getUnlinkedShows } = unlinkedShowsApi();
  const [unlinkedShows, setUnlinkedShows] = useState<UnlinkedShowModel[]>([]);
  const [unlinkedShowsCount, setUnlinkedShowsCount] = useState<number>(0);
  const [clearSearch, setClearSearch] = useState(false);
  const take = 12;

  const load = async () => {
    const { data, count } = await loadUnlinkedShows(take);
    setUnlinkedShows(data);
    setUnlinkedShowsCount(count);
  };

  const get = async (page: number, search: string) => {
    const { data, count } = await getUnlinkedShows(page, take, search);
    setUnlinkedShows(data);
    setUnlinkedShowsCount(count);
  };

  useEffect(() => {
    load();
  }, []);

  const body = (
    <div>
      <List
        count={unlinkedShowsCount}
        onGet={get}
        clearSearch={clearSearch}
        take={take}
      >
        {unlinkedShows.map((unlinkedShow: UnlinkedShowModel) => (
          <UnlinkedShowCard
            key={unlinkedShow.showName}
            unlinkedShow={unlinkedShow}
          />
        ))}
      </List>
    </div>
  );

  return <>{body}</>;
};
