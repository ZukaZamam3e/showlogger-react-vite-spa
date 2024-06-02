import { useEffect, useState } from 'react';
import { protectedResources } from '../../../config/apiConfig';
import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
import { List } from '../../Common/List';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showErrors } from '../../../slices/errorsSlice';
import { FriendCard } from './FriendCard';
import { FriendModel } from '../../../models/FriendModel';
import { Fab } from '@mui/material';
import { placements } from '../../../config/placementConfig';
import AddIcon from '@mui/icons-material/Add';
import { RequestFriend } from './RequestFriend';

export const FriendTab = () => {
  const dispatch = useDispatch();
  const { getData, postData } = useFetch();
  const [friends, setFriends] = useState<FriendModel[]>([]);
  const [friendCount, setFriendCount] = useState<number>(0);
  const [clearSearch, setClearSearch] = useState(false);
  const [hideAddButton, setHideAddButton] = useState(false);
  const [addingFriend, setAddingFriend] = useState(false);
  const take = 12;

  const load = async () => {
    dispatch(startLoading());
    await getData(
      `${protectedResources.oaprojectsApi.friendEndpoint}/load?take=${take}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setFriends(json.model.friends);
          setFriendCount(json.model.count);
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
      `${protectedResources.oaprojectsApi.friendEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setFriends(json.model.friends);
          setFriendCount(json.model.count);
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  useEffect(() => {
    load();
  }, []);

  const handleAcceptFriendRequest = async (friendRequestId: number) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.friendEndpoint}/acceptfriendrequest`,
      {
        friendRequestId: friendRequestId * -1,
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

  const handleDenyFriendRequest = async (friendRequestId: number) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.friendEndpoint}/denyfriendrequest`,
      {
        friendRequestId: friendRequestId * -1,
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

  const handleDeleteFriend = async (friendId: number) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.friendEndpoint}/delete`,
      {
        friendId: friendId,
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

  const handleSendFriendRequest = async (email: string) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.friendEndpoint}/addfriend`,
      {
        email: email,
        dateAdded: new Date(),
      },
    )
      .then(async json => {
        if (json.errors.length == 0) {
          handleCancelFriendRequest();
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
