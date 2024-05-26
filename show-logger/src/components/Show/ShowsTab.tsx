import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { protectedResources } from '../../config/apiConfig';
import { ReactNode, useEffect, useState } from 'react';
import { ShowModel, createNewShow } from '../../models/ShowModel';
import { Backdrop, CircularProgress, Fab, useTheme } from '@mui/material';
import { CodeValueModel } from '../../models/CodeValueModel';
import AddIcon from '@mui/icons-material/Add';
import { ShowCard } from './ShowCard';
import { EditShow } from './EditShow';
import { TransactionItemModel } from '../../models/TransactionItemModel';
import { NewShow } from './NewShow';
import { AddWatchFromSearchModel } from '../../models/AddWatchFromSearchModel';
import { ErrorMessage } from '../ErrorMessage';
import { BingeWatch } from './BingeWatch';
import { placements } from '../../config/placementConfig';
import { BingeWatchModel } from '../../models/BingeWatchModel';
import { List } from '../List';

interface ShowsTabProps {
  isMobile: boolean;
}

export const ShowsTab = (props: ShowsTabProps) => {
  const theme = useTheme();

  const { getData, postData } = useFetch();
  const [shows, setShows] = useState<ShowModel[]>([]);
  const [showCount, setShowCount] = useState<number>(0);
  const [showTypeIds, setShowTypeIds] = useState<CodeValueModel[]>([]);
  const [transactionItems, setTransactionItems] = useState<
    TransactionItemModel[]
  >([]);
  const [transactionTypeIds, setTransactionTypeIds] = useState<
    CodeValueModel[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
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

  const [errors, setErrors] = useState<string[]>([]);

  const take = 12;

  const load = async () => {
    setIsLoading(true);
    await getData(
      `${protectedResources.oaprojectsApi.showEndpoint}/load?take=${take}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setShows(json.model.shows);
          setShowCount(json.model.count);
          setShowTypeIds(json.model.showTypeIds);
          setTransactionTypeIds(json.model.transactionTypeIds);
          setTransactionItems(json.model.transactionItems);
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
      `${protectedResources.oaprojectsApi.showEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setShows(json.model.shows);
          setShowCount(json.model.count);
        } else {
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleShowSave = async (
    show: ShowModel,
    searchSkippedOrEdit: boolean,
  ) => {
    setIsLoading(true);

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

  const handleDelete = async (showId: number) => {
    setClearSearch(prev => !prev);
    setIsLoading(true);
    await postData(`${protectedResources.oaprojectsApi.showEndpoint}/delete`, {
      showId: showId,
    })
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

  const handleAddOneDay = async (showId: number) => {
    setClearSearch(prev => !prev);
    setIsLoading(true);
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
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubtractOneDay = async (showId: number) => {
    setClearSearch(prev => !prev);
    setIsLoading(true);
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
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBingeSave = async (binge: BingeWatchModel) => {
    setIsLoading(true);

    let url = `${protectedResources.oaprojectsApi.showEndpoint}/addrange`;

    await postData(url, binge)
      .then(async json => {
        if (json.errors.length == 0) {
          handleCancelBingeWatchShow();

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

  const handleCloseErrors = () => {
    setErrors([]);
    setHasError(false);
  };

  const handleToggleSearch = () => {
    setHideAddButton(prev => !prev);
  };

  const sxBody = {
    display: !editing.show && !creating.show && !bingeWatchEdit.show ? "initial" : "none"
  };

  const editShow = editing.show && <EditShow
    show={editing.editingShow}
    showTypeIds={showTypeIds}
    transactionItems={transactionItems}
    onCancelSelectedShow={handleCancelSelectedShow}
    onShowSave={handleShowSave}
    searchSkippedOrEdit={true}
  />

  const createShow = creating.show && <NewShow
  show={createNewShow()}
  showTypeIds={showTypeIds}
  transactionItems={transactionItems}
  onCancelSelectedShow={handleCancelCreatingShow}
  onShowSave={handleShowSave}
/>

const bingeShow = bingeWatchEdit.show && <BingeWatch
show={bingeWatchEdit.bingeWatchEditShow}
onBingeSave={handleBingeSave}
onCancelBinge={handleCancelBingeWatchShow}
/>;

  // if (editing.show) {
  //   body = (
  //     <>
  //       <EditShow
  //         show={editing.editingShow}
  //         showTypeIds={showTypeIds}
  //         transactionItems={transactionItems}
  //         onCancelSelectedShow={handleCancelSelectedShow}
  //         onShowSave={handleShowSave}
  //         searchSkippedOrEdit={true}
  //       />
  //     </>
  //   );
  // } else 
  
  // if (creating.show) {
  //   body = (
  //     <NewShow
  //       show={createNewShow()}
  //       showTypeIds={showTypeIds}
  //       transactionItems={transactionItems}
  //       onCancelSelectedShow={handleCancelCreatingShow}
  //       onShowSave={handleShowSave}
  //     />
  //   );
  // } else 
  
  // if (bingeWatchEdit.show) {
  //   body = (
  //     <BingeWatch
  //       show={bingeWatchEdit.bingeWatchEditShow}
  //       onBingeSave={handleBingeSave}
  //       onCancelBinge={handleCancelBingeWatchShow}
  //     />
  //   );
  // } else {

    const body = (
      <div
        style={sxBody}
      >
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
          isMobile={props.isMobile}
          onGet={get}
          take={take}
          clearSearch={clearSearch}
          onToggleSearch={handleToggleSearch}
        >
          {shows.map((show: ShowModel) => (
            <ShowCard
              key={show.showId}
              show={show}
              isMobile={props.isMobile}
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
