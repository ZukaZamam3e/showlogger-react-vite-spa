import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { UnlinkedShowModel } from '../../../models/UnlinkedShowModel';
import { UnlinkedShowCard } from './UnlinkedShowCard';
import { unlinkedShowsApi } from '../../../api/unlinkedShowsApi';
import { UpdateUnlinkedNameModel } from '../../../models/UpdateUnlinkedNameModel';
import { SearchShowModel } from '../../../models/SearchShowModel';
import { UpdateShowName } from './UpdateShowName';

interface UnlinkedShowTabProps {
  onSearchShow: (model: SearchShowModel) => void;
}

export const UnlinkedShowsTab = (props: UnlinkedShowTabProps) => {
  const { loadUnlinkedShows, getUnlinkedShows, updateShowNames, linkShows } =
    unlinkedShowsApi();
  const [unlinkedShows, setUnlinkedShows] = useState<UnlinkedShowModel[]>([]);
  const [unlinkedShowsCount, setUnlinkedShowsCount] = useState<number>(0);
  const [clearSearch, setClearSearch] = useState(false);
  const [updateShowNameEdit, setUpdateShowNameEdit] = useState({
    show: false,
    showName: '',
    showTypeId: -1,
  });
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

  const handleUpdateShowNames = async (model: UpdateUnlinkedNameModel) => {
    setClearSearch(prev => !prev);
    const success = await updateShowNames(model);

    if (success) {
      handleCancelUpdateShowName();
      await get(0, '');
    }
  };

  const handleLinkShows = async (model: UnlinkedShowModel) => {
    setClearSearch(prev => !prev);
    const success = await linkShows({
      showName: model.showName,
      showTypeId: model.showTypeId,
      infoId: model.infoId,
    });

    if (success) {
      await get(0, '');
    }
  };

  const handleSearchShow = (model: UnlinkedShowModel) => {
    props.onSearchShow({
      name: model.showName,
      type: model.showTypeId == 1000 ? 0 : 1,
    });
  };

  const handleSelectUpdateShowName = (model: UnlinkedShowModel) => {
    setUpdateShowNameEdit({
      show: true,
      showName: model.showName,
      showTypeId: model.showTypeId,
    });
  };

  const handleCancelUpdateShowName = () => {
    setUpdateShowNameEdit({ show: false, showName: '', showTypeId: -1 });
  };

  useEffect(() => {
    load();
  }, []);

  const updateShowName = updateShowNameEdit.show && (
    <UpdateShowName
      showName={updateShowNameEdit.showName}
      showTypeId={updateShowNameEdit.showTypeId}
      onUpdateShowName={handleUpdateShowNames}
      onCancelUpdateShowName={handleCancelUpdateShowName}
    />
  );

  const sxBody = {
    display: !updateShowNameEdit.show ? 'initial' : 'none',
  };

  const body = (
    <div style={sxBody}>
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
            onSearchShow={handleSearchShow}
            onSelectUpdateShowName={handleSelectUpdateShowName}
            onLinkShow={handleLinkShows}
          />
        ))}
      </List>
    </div>
  );

  return (
    <>
      {body}
      {updateShowName}
    </>
  );
};
