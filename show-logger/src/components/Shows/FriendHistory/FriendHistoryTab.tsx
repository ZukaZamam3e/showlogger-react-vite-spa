import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { FriendHistoryCard } from './FriendHistoryCard';
import { FriendHistoryModel } from '../../../models/FriendHistoryModel';
import { friendHistoryApi } from '../../../api/friendHistoryApi';

export const FriendHistoryTab = () => {
  const { getShows } = friendHistoryApi();
  const [friendHistory, setFriendHistory] = useState<FriendHistoryModel[]>([]);
  const [friendHistoryCount, setFriendHistoryCount] = useState<number>(0);
  const take = 12;

  const get = async (page: number, search: string) => {
    const { data, count } = await getShows(page, take, search);
    setFriendHistory(data);
    setFriendHistoryCount(count);
  };

  useEffect(() => {
    get(0, '');
  }, []);

  return (
    <List count={friendHistoryCount} onGet={get} take={take}>
      {friendHistory.map((fh: FriendHistoryModel) => (
        <FriendHistoryCard key={fh.show.showId} show={fh.show} name={fh.name} />
      ))}
    </List>
  );
};
