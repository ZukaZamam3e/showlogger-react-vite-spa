import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { FriendCard } from './FriendCard';
import { FriendModel } from '../../../models/FriendModel';
import { Fab } from '@mui/material';
import { placements } from '../../../config/placementConfig';
import AddIcon from '@mui/icons-material/Add';
import { RequestFriend } from './RequestFriend';
import { friendApi } from '../../../api/friendApi';

export const FriendTab = () => {
  const {
    loadFriend,
    getFriend,
    acceptFriendRequest,
    denyFriendRequest,
    addFriend,
    deleteFriend,
  } = friendApi();
  const [friends, setFriends] = useState<FriendModel[]>([]);
  const [friendCount, setFriendCount] = useState<number>(0);
  const [clearSearch, setClearSearch] = useState(false);
  const [hideAddButton, setHideAddButton] = useState(false);
  const [addingFriend, setAddingFriend] = useState(false);
  const take = 12;

  const load = async () => {
    const { data, count } = await loadFriend(take);
    setFriends(data);
    setFriendCount(count);
  };

  const get = async (page: number, search: string) => {
    const { data, count } = await getFriend(page, take, search);
    setFriends(data);
    setFriendCount(count);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAcceptFriendRequest = async (friendRequestId: number) => {
    setClearSearch(prev => !prev);
    const success = await acceptFriendRequest(friendRequestId * -1);

    if (success) {
      await get(0, '');
    }
  };

  const handleDenyFriendRequest = async (friendRequestId: number) => {
    setClearSearch(prev => !prev);
    const success = await denyFriendRequest(friendRequestId * -1);

    if (success) {
      await get(0, '');
    }
  };

  const handleDeleteFriend = async (friendId: number) => {
    setClearSearch(prev => !prev);
    const success = await deleteFriend(friendId);

    if (success) {
      await get(0, '');
    }
  };

  const handleSendFriendRequest = async (email: string) => {
    setClearSearch(prev => !prev);
    const success = await addFriend({
      email: email,
      dateAdded: new Date(),
    });

    if (success) {
      await get(0, '');
    }
  };

  const handleAddNew = () => {
    setAddingFriend(true);
  };

  const handleCancelFriendRequest = () => {
    setAddingFriend(false);
  };

  const handleToggleSearch = () => {
    setHideAddButton(prev => !prev);
  };

  const requestFriend = addingFriend && (
    <RequestFriend
      onSendFriendRequest={handleSendFriendRequest}
      onCancelFriendRequest={handleCancelFriendRequest}
    />
  );

  const sxBody = {
    display: !addingFriend ? 'initial' : 'none',
  };

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
        count={friendCount}
        onGet={get}
        take={take}
        clearSearch={clearSearch}
        onToggleSearch={handleToggleSearch}
      >
        {friends.map((f: FriendModel) => (
          <FriendCard
            key={f.id}
            friend={f}
            onAcceptFriendRequest={handleAcceptFriendRequest}
            onDenyFriendRequest={handleDenyFriendRequest}
            onDeleteFriend={handleDeleteFriend}
          />
        ))}
      </List>
    </div>
  );

  return (
    <>
      {body}
      {requestFriend}
    </>
  );
};
