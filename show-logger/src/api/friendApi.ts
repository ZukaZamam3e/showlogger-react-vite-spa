import { useFetch } from '../hooks/useFetchOAProjectsAPI';
import { protectedResources } from '../config/apiConfig';
import { FriendModel } from '../models/FriendModel';

export const friendApi = () => {
  const { getData, postData } = useFetch();

  const loadFriend = async (take: number) => {
    let data: FriendModel[] = [];
    let count: number = 0;

    await getData(
      `${protectedResources.oaprojectsApi.friendEndpoint}/load?take=${take}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.friends;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const getFriend = async (page: number, take: number, search: string) => {
    let data: FriendModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.friendEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.friends;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const acceptFriendRequest = async (friendRequestId: number) => {
    let success: boolean = false;
    await postData(
      `${protectedResources.oaprojectsApi.friendEndpoint}/acceptfriendrequest`,
      {
        friendRequestId,
      },
    ).then(async json => {
      if (json.errors.length == 0) {
        success = true;
      }
    });
    return success;
  };

  const denyFriendRequest = async (friendRequestId: number) => {
    let success: boolean = false;
    await postData(
      `${protectedResources.oaprojectsApi.friendEndpoint}/denyfriendrequest`,
      {
        friendRequestId,
      },
    ).then(async json => {
      if (json.errors.length == 0) {
        success = true;
      }
    });
    return success;
  };

  const addFriend = async (data: any) => {
    let success: boolean = false;
    await postData(
      `${protectedResources.oaprojectsApi.friendEndpoint}/addfriend`,
      data,
    ).then(async json => {
      if (json.errors.length == 0) {
        success = true;
      }
    });

    return success;
  };

  const deleteFriend = async (friendId: number) => {
    let success: boolean = false;
    await postData(
      `${protectedResources.oaprojectsApi.friendEndpoint}/delete`,
      {
        friendId,
      },
    ).then(async json => {
      if (json.errors.length == 0) {
        success = true;
      }
    });

    return success;
  };

  return {
    loadFriend,
    getFriend,
    acceptFriendRequest,
    denyFriendRequest,
    addFriend,
    deleteFriend,
  };
};
