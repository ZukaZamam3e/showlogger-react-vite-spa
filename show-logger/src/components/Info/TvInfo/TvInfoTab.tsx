import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { TvInfoCard } from './TvInfoCard';
import { TvInfoModel, createNewTvInfo } from '../../../models/TvInfoModel';
import { ViewTvInfo } from './ViewTvInfo';
import { tvInfoApi } from '../../../api/tvInfoApi';

export const TvInfoTab = () => {
  const { loadTvInfo, getTvInfo, deleteTvInfo } = tvInfoApi();
  const [tvInfos, setTvInfos] = useState<TvInfoModel[]>([]);
  const [tvInfoCount, setTvInfoCount] = useState<number>(0);
  const [clearSearch, setClearSearch] = useState(false);
  const [viewing, setViewing] = useState({
    show: false,
    viewingTvInfo: createNewTvInfo(),
  });
  const take = 12;

  const load = async () => {
    const { data, count } = await loadTvInfo(take);
    setTvInfos(data);
    setTvInfoCount(count);
  };

  const get = async (page: number, search: string) => {
    const { data, count } = await getTvInfo(page, take, search);
    setTvInfos(data);
    setTvInfoCount(count);
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
    const success = await deleteTvInfo(tvInfoId);

    if (success) {
      await get(0, '');
    }
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
