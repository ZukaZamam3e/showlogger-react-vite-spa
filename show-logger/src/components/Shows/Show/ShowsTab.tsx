import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
import { protectedResources } from '../../../config/apiConfig';
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
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showErrors } from '../../../slices/errorsSlice';
import { useDispatch } from 'react-redux';

export const ShowsTab = () => {
  const dispatch = useDispatch();

  const { getData, postData } = useFetch();
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
    dispatch(startLoading());
    await getData(
      `${protectedResources.oaprojectsApi.showEndpoint}/load?take=${take}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setShows(json.model.shows);
          setShowCount(json.model.count);
          setShowTypeIds(json.model.showTypeIds);
          setTransactionItems(json.model.transactionItems);
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
      `${protectedResources.oaprojectsApi.showEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setShows(json.model.shows);
          setShowCount(json.model.count);
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  const handleShowSave = async (
    show: ShowModel,
    searchSkippedOrEdit: boolean,
  ) => {
    dispatch(startLoading());

    let endpoint = protectedResources.oaprojectsApi.showEndpoint;
    let hook = 'save';

    let data: any = show;

    if (!searchSkippedOrEdit) {
      hook = 'addwatchfromsearch';
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
      };

      data = watchFromSearch;
    }

    if (show.watchlist !== null && show.watchlist) {
      endpoint = protectedResources.oaprojectsApi.watchlistEnpoint;
      data.dateAdded = show.dateWatched;
    }

    let url = `${endpoint}/${hook}`;

    await postData(url, data)
      .then(async json => {
        if (json.errors.length == 0) {
          if (!searchSkippedOrEdit) {
            handleCancelCreatingShow();
          } else {
            handleCancelSelectedShow();
          }

          await get(0, '');
        } else {
          console.log(json);
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

  const handleDelete = async (showId: number) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
    await postData(`${protectedResources.oaprojectsApi.showEndpoint}/delete`, {
      showId: showId,
    })
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

  const handleAddOneDay = async (showId: number) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.showEndpoint}/addoneday`,
      {
        showId: showId,
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

  const handleSubtractOneDay = async (showId: number) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.showEndpoint}/subtractoneday`,
      {
        showId: showId,
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

  const handleBingeSave = async (binge: BingeWatchModel) => {
    dispatch(startLoading());

    let url = `${protectedResources.oaprojectsApi.showEndpoint}/addrange`;

    await postData(url, binge)
      .then(async json => {
        if (json.errors.length == 0) {
          handleCancelBingeWatchShow();

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
