import { useDispatch } from 'react-redux';
import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showErrors } from '../../../slices/errorsSlice';
import { protectedResources } from '../../../config/apiConfig';
import { TvInfoCard } from './TvInfoCard';
import { TvInfoModel, createNewTvInfo } from '../../../models/TvInfoModel';
import { ViewTvInfo } from './ViewTvInfo';

export const TvInfoTab = () => {
  const dispatch = useDispatch();

  const { getData, postData } = useFetch();
  const [tvInfos, setTvInfos] = useState<TvInfoModel[]>([]);
  const [tvInfoCount, setTvInfoCount] = useState<number>(0);
  const [clearSearch, setClearSearch] = useState(false);
  const [viewing, setViewing] = useState({
    show: false,
    viewingTvInfo: createNewTvInfo(),
  });
  const take = 12;

  const load = async () => {
    dispatch(startLoading());
    await getData(
      `${protectedResources.oaprojectsApi.tvInfoEndpoint}/load?take=${take}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setTvInfos(json.model.tvInfos);
          setTvInfoCount(json.model.count);
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
      `${protectedResources.oaprojectsApi.tvInfoEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setTvInfos(json.model.tvInfos);
          setTvInfoCount(json.model.count);
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

  const handleSelectTvInfo = (tvInfo: TvInfoModel) => {
    setViewing({ show: true, viewingTvInfo: tvInfo });
  };

  const handleCancelSelectedTvInfo = () => {
    setViewing({
      show: false,
      viewingTvInfo: createNewTvInfo(),
    });
  };

  const handleDeleteTvInfo = async (tvInfoId: number) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.tvInfoEndpoint}/delete`,
      {
        tvInfoId: tvInfoId,
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

  const sxBody = {
    display: !viewing.show ? 'initial' : 'none',
  };

  const viewTvInfo = viewing.show && (
    <ViewTvInfo
      tvInfo={viewing.viewingTvInfo}
      onCancelSelectedTvInfo={handleCancelSelectedTvInfo}
    />
  );

  const body = (
    <div style={sxBody}>
      <List
        count={tvInfoCount}
        onGet={get}
        clearSearch={clearSearch}
        take={take}
      >
        {tvInfos.map((tvInfo: TvInfoModel) => (
          <TvInfoCard
            key={tvInfo.tvInfoId}
            tvInfo={tvInfo}
            onSelectTvInfo={handleSelectTvInfo}
            onDeleteTvInfo={handleDeleteTvInfo}
          />
        ))}
      </List>
    </div>
  );

  return (
    <>
      {body}
      {viewTvInfo}
    </>
  );
};
