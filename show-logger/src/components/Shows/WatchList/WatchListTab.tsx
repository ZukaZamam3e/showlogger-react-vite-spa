import { useEffect, useState } from 'react';
import { WatchListCard } from './WatchListCard';
import {
  WatchListModel,
  createNewWatchList,
} from '../../../models/WatchListModel';
import { List } from '../../Common/List';
import { CodeValueModel } from '../../../models/CodeValueModel';
import { EditWatchList } from './EditWatchList';
import { watchListApi } from '../../../api/watchlistApi';

export const WatchListTab = () => {
  const {
    loadWatchList,
    getWatchList,
    saveWatchList,
    deleteWatchList,
    moveToShows,
  } = watchListApi();
  const [watchList, setWatchList] = useState<WatchListModel[]>([]);
  const [watchListCount, setWatchListCount] = useState<number>(0);
  const [showTypeIds, setShowTypeIds] = useState<CodeValueModel[]>([]);
  const [clearSearch, setClearSearch] = useState(false);
  const [editing, setEditing] = useState({
    show: false,
    editingWatchList: createNewWatchList(),
  });
  const take = 12;

  const load = async () => {
    const { data, count, showTypeIds } = await loadWatchList(take);
    setWatchList(data);
    setWatchListCount(count);
    setShowTypeIds(showTypeIds);
  };

  const get = async (page: number, search: string) => {
    const { data, count } = await getWatchList(page, take, search);
    setWatchList(data);
    setWatchListCount(count);
  };
  useEffect(() => {
    load();
  }, []);

  const handleSelectWatchList = (watchlist: WatchListModel) => {
    setEditing({ show: true, editingWatchList: watchlist });
  };

  const handleMoveToShows = async (watchlistId: number) => {
    setClearSearch(prev => !prev);
    const success = await moveToShows(watchlistId, new Date());

    if (success) {
      await get(0, '');
    }
  };

  const handleDeleteWatchList = async (watchlistId: number) => {
    setClearSearch(prev => !prev);
    const success = await deleteWatchList(watchlistId);

    if (success) {
      await get(0, '');
    }
  };

  const handleWatchlistSave = async (watchlist: WatchListModel) => {
    const updatedWatchList = await saveWatchList(watchlist);

    if (updatedWatchList != null) {
      handleCancelSelectedWatchlist();
      await get(0, '');
    }
  };

  const handleCancelSelectedWatchlist = () => {
    setEditing({ show: false, editingWatchList: createNewWatchList() });
  };

  useEffect(() => {
    load();
  }, []);

  const sxBody = {
    display: !editing.show ? 'initial' : 'none',
  };

  const editShow = editing.show && (
    <EditWatchList
      watchlist={editing.editingWatchList}
      showTypeIds={showTypeIds}
      onCancelSelectedWatchlist={handleCancelSelectedWatchlist}
      onWatchlistSave={handleWatchlistSave}
    />
  );

  const body = (
    <div style={sxBody}>
      <List
        count={watchListCount}
        onGet={get}
        clearSearch={clearSearch}
        take={take}
      >
        {watchList.map((watchlist: WatchListModel) => (
          <WatchListCard
            key={watchlist.watchlistId}
            watchlist={watchlist}
            onSelectWatchList={handleSelectWatchList}
            onMoveToShows={handleMoveToShows}
            onDeleteWatchList={handleDeleteWatchList}
          />
        ))}
      </List>
    </div>
  );

  return (
    <>
      {body}
      {editShow}
    </>
  );
};
