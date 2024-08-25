import { useEffect, useState } from 'react';
import { ShowModel, createNewShow } from '../../../models/ShowModel';
import { Fab } from '@mui/material';
import { CodeValueModel } from '../../../models/CodeValueModel';
import AddIcon from '@mui/icons-material/Add';
import { ShowCard } from './ShowCard';
import { EditShow } from './EditShow';
import { TransactionItemModel } from '../../../models/TransactionItemModel';
import { NewShow } from './NewShow';
import { AddWatchFromSearchModel } from '../../../models/AddWatchFromSearchModel';
import { BingeWatch } from './BingeWatch';
import { placements } from '../../../config/placementConfig';
import { BingeWatchModel } from '../../../models/BingeWatchModel';
import { List } from '../../Common/List';
import { showApi } from '../../../api/showApi';
import { watchListApi } from '../../../api/watchlistApi';
import { WatchListModel } from '../../../models/WatchListModel';

export const ShowsTab = () => {
  const {
    loadShow,
    getShow,
    saveShow,
    addWatchFromSearch,
    deleteShow,
    addNextEpisode,
    addOneday,
    subtractOneday,
    addRange,
  } = showApi();

  const { saveWatchList } = watchListApi();
  const [shows, setShows] = useState<ShowModel[]>([]);
  const [showCount, setShowCount] = useState<number>(0);
  const [showTypeIds, setShowTypeIds] = useState<CodeValueModel[]>([]);
  const [transactionItems, setTransactionItems] = useState<
    TransactionItemModel[]
  >([]);
  const [clearSearch, setClearSearch] = useState(false);
  const [hideAddButton, setHideAddButton] = useState(false);

  const [editing, setEditing] = useState({
    show: false,
    editingShow: createNewShow(),
  });

  const [creating, setCreating] = useState({
    show: false,
    creatingShow: createNewShow(),
  });

  const [bingeWatchEdit, setBingeWatchEdit] = useState({
    show: false,
    bingeWatchEditShow: createNewShow(),
  });

  const take = 12;

  const load = async () => {
    const { data, count, showTypeIds, items } = await loadShow(take);
    setShows(data);
    setShowCount(count);
    setShowTypeIds(showTypeIds);
    setTransactionItems(items);
  };

  const get = async (page: number, search: string) => {
    const { data, count } = await getShow(page, take, search);
    setShows(data);
    setShowCount(count);
  };

  const handleShowSave = async (
    show: ShowModel,
    searchSkippedOrEdit: boolean,
  ) => {
    let updatedShow: ShowModel | null = null;
    let updated: any;

    if (!searchSkippedOrEdit) {
      const watchFromSearch: AddWatchFromSearchModel = {
        api: show.api,
        type: show.type,
        id: show.id,
        showName: show.showName,
        showTypeId: show.showTypeId,
        showNotes: show.showNotes,
        restartBinge: show.restartBinge,
        dateWatched: show.dateWatched,
        episodeNumber: show.episodeNumber,
        seasonNumber: show.seasonNumber,
        transactions: show.transactions,
        watchlist: show.watchlist ?? false,
      };

      updated = await addWatchFromSearch(watchFromSearch);
    } else {
      updatedShow = await saveShow(show);
    }

    if (updatedShow != null || updated.isSuccess) {
      if (!searchSkippedOrEdit) {
        handleCancelCreatingShow();
      } else {
        handleCancelSelectedShow();
      }

      await get(0, '');
    }
  };

  const handleAddNextEpisode = async (showId: number) => {
    setClearSearch(prev => !prev);
    const updatedShow = await addNextEpisode(showId, new Date());

    if (updatedShow != null) {
      await get(0, '');
    }
  };

  const handleDelete = async (showId: number) => {
    setClearSearch(prev => !prev);
    const success = await deleteShow(showId);

    if (success) {
      await get(0, '');
    }
  };

  const handleAddOneDay = async (showId: number) => {
    setClearSearch(prev => !prev);
    const updatedShow = await addOneday(showId);

    if (updatedShow != null) {
      await get(0, '');
    }
  };

  const handleSubtractOneDay = async (showId: number) => {
    setClearSearch(prev => !prev);
    const updatedShow = await subtractOneday(showId);

    if (updatedShow != null) {
      await get(0, '');
    }
  };

  const handleBingeSave = async (binge: BingeWatchModel) => {
    const success = await addRange(binge);

    if (success) {
      handleCancelBingeWatchShow();
      await get(0, '');
    }
  };

  const handleBingeWatchShow = (show: ShowModel) => {
    setBingeWatchEdit({ show: true, bingeWatchEditShow: show });
  };

  const handleCancelSelectedShow = () => {
    setEditing({ show: false, editingShow: createNewShow() });
  };

  const handleCancelCreatingShow = () => {
    setCreating({ show: false, creatingShow: createNewShow() });
  };

  const handleCancelBingeWatchShow = () => {
    setBingeWatchEdit({ show: false, bingeWatchEditShow: createNewShow() });
  };

  const handleSelectShow = (show: ShowModel) => {
    setEditing({ show: true, editingShow: show });
  };

  useEffect(() => {
    load();
  }, []);

  const handleAddNew = () => {
    let newShow: ShowModel = createNewShow();

    setCreating({ show: true, creatingShow: newShow });
  };

  const handleToggleSearch = () => {
    setHideAddButton(prev => !prev);
  };

  const sxBody = {
    display:
      !editing.show && !creating.show && !bingeWatchEdit.show
        ? 'initial'
        : 'none',
  };

  const editShow = editing.show && (
    <EditShow
      show={editing.editingShow}
      showTypeIds={showTypeIds}
      transactionItems={transactionItems}
      onCancelSelectedShow={handleCancelSelectedShow}
      onShowSave={handleShowSave}
      searchSkippedOrEdit={true}
    />
  );

  const createShow = creating.show && (
    <NewShow
      show={createNewShow()}
      showTypeIds={showTypeIds}
      transactionItems={transactionItems}
      onCancelSelectedShow={handleCancelCreatingShow}
      onShowSave={handleShowSave}
    />
  );

  const bingeShow = bingeWatchEdit.show && (
    <BingeWatch
      show={bingeWatchEdit.bingeWatchEditShow}
      onBingeSave={handleBingeSave}
      onCancelBinge={handleCancelBingeWatchShow}
    />
  );

  const body = (
    <div style={sxBody}>
      {!hideAddButton && (
        <Fab
          sx={{
            position: 'fixed',
            bottom: placements.fab.secondIconBottom,
            right: placements.fab.right,
          }}
          color="success"
          aria-label="add"
          onClick={handleAddNew}
        >
          <AddIcon />
        </Fab>
      )}
      <List
        count={showCount}
        onGet={get}
        take={take}
        clearSearch={clearSearch}
        onToggleSearch={handleToggleSearch}
      >
        {shows.map((show: ShowModel) => (
          <ShowCard
            key={show.showId}
            show={show}
            onSelectShow={handleSelectShow}
            onAddNextEpisode={handleAddNextEpisode}
            onDeleteShow={handleDelete}
            onAddOneDay={handleAddOneDay}
            onSubtractOneDay={handleSubtractOneDay}
            onBingeWatchShow={handleBingeWatchShow}
          />
        ))}
      </List>
    </div>
  );

  return (
    <>
      {body}
      {editShow}
      {createShow}
      {bingeShow}
    </>
  );
};
