import { useDispatch } from 'react-redux';
import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showErrors } from '../../../slices/errorsSlice';
import { protectedResources } from '../../../config/apiConfig';
import { UnlinkedShowModel } from '../../../models/UnlinkedShowModel';
import { UnlinkedShowCard } from './UnlinkedShowCard';
// import { MovieInfoCard } from './MovieInfoCard';
// import {
//   MovieInfoModel,
//   createNewMovieInfo,
// } from '../../../models/MovieInfoModel';

export const UnlinkedShowsTab = () => {
  const dispatch = useDispatch();

  const { getData, postData } = useFetch();
  const [unlinkedShows, setUnlinkedShows] = useState<UnlinkedShowModel[]>([]);
  const [unlinkedShowsCount, setUnlinkedShowsCount] = useState<number>(0);
  const [clearSearch, setClearSearch] = useState(false);
  const take = 12;

  const load = async () => {
    dispatch(startLoading());
    await getData(
      `${protectedResources.oaprojectsApi.unlinkedShowsEndpoint}/load?take=${take}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setUnlinkedShows(json.model.unlinkedShows);
          setUnlinkedShowsCount(json.model.count);
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
      `${protectedResources.oaprojectsApi.unlinkedShowsEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setUnlinkedShows(json.model.unlinkedShows);
          setUnlinkedShowsCount(json.model.count);
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
