import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { BookFriendHistoryModel } from '../../../models/BookFriendHistoryModel';
import { BookFriendHistoryCard } from './BookFriendHistoryCard';
import { friendHistoryApi } from '../../../api/friendHistoryApi';

export const BookFriendHistoryTab = () => {
  const { getBooks } = friendHistoryApi();
  const [friendHistory, setFriendHistory] = useState<BookFriendHistoryModel[]>(
    [],
  );
  const [friendHistoryCount, setFriendHistoryCount] = useState<number>(0);
  const take = 12;

  const get = async (page: number, search: string) => {
    const { data, count } = await getBooks(page, take, search);
    setFriendHistory(data);
    setFriendHistoryCount(count);
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
