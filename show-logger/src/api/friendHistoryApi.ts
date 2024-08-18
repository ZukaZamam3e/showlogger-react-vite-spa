import { useFetch } from '../hooks/useFetchOAProjectsAPI';
import { protectedResources } from '../config/apiConfig';
import { BookFriendHistoryModel } from '../models/BookFriendHistoryModel';
import { FriendHistoryModel } from '../models/FriendHistoryModel';

export const friendHistoryApi = () => {
  const { getData } = useFetch();

  const getShows = async (page: number, take: number, search: string) => {
    let data: FriendHistoryModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.friendHistoryEnpoint}/getshows?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.showFriendHistory;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const getBooks = async (page: number, take: number, search: string) => {
    let data: BookFriendHistoryModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.friendHistoryEnpoint}/getBooks?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.bookFriendHistory;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  return { getShows, getBooks };
};
