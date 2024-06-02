import { useEffect, useState } from 'react';
import { protectedResources } from '../../../config/apiConfig';
import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
import { List } from '../../Common/List';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showErrors } from '../../../slices/errorsSlice';
import { BookFriendHistoryModel } from '../../../models/BookFriendHistoryModel';
import { BookFriendHistoryCard } from './BookFriendHistoryCard';

export const BookFriendHistoryTab = () => {
  const dispatch = useDispatch();
  const { getData } = useFetch();
  const [friendHistory, setFriendHistory] = useState<BookFriendHistoryModel[]>(
    [],
  );
  const [friendHistoryCount, setFriendHistoryCount] = useState<number>(0);
  const take = 12;

  const get = async (page: number, search: string) => {
    dispatch(startLoading());
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.friendHistoryEnpoint}/getBooks?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setFriendHistory(json.model.bookFriendHistory);
          setFriendHistoryCount(json.model.count);
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
    get(0, '');
  }, []);

  return (
    <List count={friendHistoryCount} onGet={get} take={take}>
      {friendHistory.map((fh: BookFriendHistoryModel) => (
        <BookFriendHistoryCard
          key={fh.book.bookId}
          book={fh.book}
          name={fh.name}
        />
      ))}
    </List>
  );
};
