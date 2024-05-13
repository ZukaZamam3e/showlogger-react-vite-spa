import { ReactNode, useEffect, useState } from 'react';
import { protectedResources } from '../../config/apiConfig';
import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { ErrorMessage } from '../ErrorMessage';
import { Backdrop, CircularProgress } from '@mui/material';
import { WatchListCard } from './WatchListCard';
import {
  WatchListModel,
  createNewWatchList,
} from '../../models/WatchListModel';
import { List } from '../List';
import { CodeValueModel } from '../../models/CodeValueModel';
import { EditWatchList } from './EditWatchList';

interface WatchListTabProps {
  isMobile: boolean;
}

export const WatchListTab = (props: WatchListTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getData, postData } = useFetch();
  const [watchList, setWatchList] = useState<WatchListModel[]>([]);
  const [watchListCount, setWatchListCount] = useState<number>(0);
  const [showTypeIds, setShowTypeIds] = useState<CodeValueModel[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);
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
    setIsLoading(true);
    await getData(
      `${protectedResources.oaprojectsApi.watchlistEnpoint}/load?take=${take}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setWatchList(json.model.watchLists);
          setWatchListCount(json.model.count);
          setShowTypeIds(json.model.showTypeIds);
        } else {
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const get = async (page: number, search: string) => {
    setIsLoading(true);
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.watchlistEnpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setWatchList(json.model.watchLists);
          setWatchListCount(json.model.count);
        } else {
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    load();
  }, []);

  const handleCloseErrors = () => {
    setErrors([]);
    setHasError(false);
  };

  const handleSelectWatchList = (watchlist: WatchListModel) => {
    setEditing({ show: true, editingWatchList: watchlist });
  };

  const handleMoveToShows = async (watchlistId: number) => {
    setClearSearch(prev => !prev);
    setIsLoading(true);
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
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteWatchList = async (watchlistId: number) => {
    setClearSearch(prev => !prev);
    setIsLoading(true);
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

  const handleWatchlistSave = async (watchlist: WatchListModel) => {
    setIsLoading(true);

    let url = `${protectedResources.oaprojectsApi.watchlistEnpoint}/save`;

    await postData(url, watchlist)
      .then(async json => {
        if (json.errors.length == 0) {
          handleCancelSelectedWatchlist();

          await get(0, '');
        } else {
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCancelSelectedWatchlist = () => {
    setEditing({ show: false, editingWatchList: createNewWatchList() });
  };

  useEffect(() => {
    load();
  }, []);

  let body: ReactNode;

  if (editing.show) {
    body = (
      <>
        <EditWatchList
          watchlist={editing.editingWatchList}
          showTypeIds={showTypeIds}
          onCancelSelectedWatchlist={handleCancelSelectedWatchlist}
          onWatchlistSave={handleWatchlistSave}
          //   searchSkippedOrEdit={true}
        />
      </>
    );
  } else {
    body = (
      <List
        count={watchListCount}
        isMobile={props.isMobile}
        onGet={get}
        clearSearch={clearSearch}
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
    );
  }

  return (
    <>
      {body}
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
