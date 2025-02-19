import { List } from '../../Common/List';
import { watchedApi } from '../../../api/watchedApi';
import { createNewWatched, WatchedModel } from '../../../models/WatchedModel';
import { useEffect, useState } from 'react';
import { EditWatched } from '../Common/EditWatched';
import { NewWatched } from '../Common/NewWatched';
import { FabAdd } from '../../Common/FabAdd';
import { CreatedWatchedModel } from '../../../models/CreatedWatchedModel';
import { WatchedCard } from '../Common/WatchedCard';

export const TVTab = () => {
  const { getTV, loadTV, saveWatched, deleteWatched, createWatched } =
    watchedApi();

  const [watched, setWatched] = useState<WatchedModel[]>([]);
  const [watchedCount, setWatchedCount] = useState<number>(0);
  const [hideAddButton, setHideAddButton] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [editing, setEditing] = useState({
    show: false,
    editing: createNewWatched(),
  });

  const [creating, setCreating] = useState({
    show: false,
    creating: createNewWatched(),
  });

  const take = 12;

  const load = async () => {
    const { data, count } = await loadTV(take);
    setWatched(data);
    setWatchedCount(count);
  };

  const get = async (page: number, search: string) => {
    const { data, count } = await getTV(page, take, search);
    setWatched(data);
    setWatchedCount(count);
  };

  const handleAddNew = () => {
    setCreating({ show: true, creating: createNewWatched() });
  };

  const handleSave = async (watch: WatchedModel) => {
    setClearSearch(prev => !prev);
    const updatedSub = await saveWatched(watch);

    if (updatedSub != null) {
      handleCancelSelected();
      await get(0, '');
    }
  };

  const handleCreate = async (watched: WatchedModel) => {
    setClearSearch(prev => !prev);
    const created: CreatedWatchedModel = {
      dateWatched: watched.dateWatched,
      api: watched.api,
      type: watched.type,
      id: watched.id,
    };
    const updated = await createWatched(created);

    if (updated != null) {
      handleCancelCreating();
      await get(0, '');
    }
  };

  const handleDelete = async (watchedId: number) => {
    const success = await deleteWatched(watchedId);

    if (success) {
      await get(0, '');
    }
  };

  const handleSelect = (watched: WatchedModel) => {
    setEditing({ show: true, editing: watched });
  };

  const handleCancelCreating = () => {
    setCreating({ show: false, creating: createNewWatched() });
  };

  const handleCancelSelected = () => {
    setEditing({ show: false, editing: createNewWatched() });
  };

  const handleToggleSearch = () => {
    setHideAddButton(prev => !prev);
  };

  useEffect(() => {
    load();
  }, []);

  const sxBody = {
    display: !editing.show && !creating.show ? 'initial' : 'none',
  };

  const edit = editing.show && (
    <EditWatched
      watched={editing.editing}
      onCancelSelectedWatched={handleCancelSelected}
      onWatchedSave={handleSave}
    />
  );

  const create = creating.show && (
    <NewWatched
      watched={createNewWatched()}
      onCancelCreatingWatched={handleCancelCreating}
      onCreateWatched={handleCreate}
    />
  );

  const body = (
    <div style={sxBody}>
      <List
        count={watchedCount}
        onGet={get}
        clearSearch={clearSearch}
        take={take}
        onToggleSearch={handleToggleSearch}
      >
        {watched.map((watch: WatchedModel) => (
          <WatchedCard
            key={watch.id}
            watched={watch}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        ))}
      </List>
      {!hideAddButton && <FabAdd onAddClick={handleAddNew} />}
    </div>
  );

  return (
    <>
      {body}
      {create}
      {edit}
    </>
  );
};
