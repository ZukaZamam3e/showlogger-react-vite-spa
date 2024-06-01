import { ReactNode, useEffect, useState } from 'react';
import { protectedResources } from '../../config/apiConfig';
import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { WatchListCard } from './WatchListCard';
import {
  WatchListModel,
  createNewWatchList,
} from '../../models/WatchListModel';
import { List } from '../List';
import { CodeValueModel } from '../../models/CodeValueModel';
import { EditWatchList } from './EditWatchList';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../slices/isLoadingSlice';
import { showErrors } from '../../slices/errorsSlice';

interface WatchListTabProps {
  isMobile: boolean;
}

export const WatchListTab = (props: WatchListTabProps) => {
  const dispatch = useDispatch();
  const { getData, postData } = useFetch();
  const [watchList, setWatchList] = useState<WatchListModel[]>([]);
  const [watchListCount, setWatchListCount] = useState<number>(0);
  const [showTypeIds, setShowTypeIds] = useState<CodeValueModel[]>([]);
  const [clearSearch, setClearSearch] = useState(false);
  const [editing, setEditing] = useState({
    show: false,
    editingWatchList: createNewWatchList(),
  });
  const take = 12;
  let pages = watchListCount && Math.floor(watchListCount / take);
  if (watchListCount % take >= 1) {
    pages += 1;
  }

  const load = async () => {
    dispatch(startLoading());
    await getData(
      `${protectedResources.oaprojectsApi.watchlistEnpoint}/load?take=${take}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setWatchList(json.model.watchLists);
          setWatchListCount(json.model.count);
          setShowTypeIds(json.model.showTypeIds);
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
      `${protectedResources.oaprojectsApi.watchlistEnpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setWatchList(json.model.watchLists);
          setWatchListCount(json.model.count);
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

  const handleSelectWatchList = (watchlist: WatchListModel) => {
    setEditing({ show: true, editingWatchList: watchlist });
  };

  const handleMoveToShows = async (watchlistId: number) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.watchlistEnpoint}/movetoshows`,
      {
        watchlistId: watchlistId,
        dateWatched: new Date(),
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
  };

  const handleDeleteWatchList = async (watchlistId: number) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.watchlistEnpoint}/delete`,
      {
        watchlistId: watchlistId,
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

  const handleWatchlistSave = async (watchlist: WatchListModel) => {
    dispatch(startLoading());

    let url = `${protectedResources.oaprojectsApi.watchlistEnpoint}/save`;

    await postData(url, watchlist)
      .then(async json => {
        if (json.errors.length == 0) {
          handleCancelSelectedWatchlist();

          await get(0, '');
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        dispatch(stopLoading());
      });
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
        isMobile={props.isMobile}
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
