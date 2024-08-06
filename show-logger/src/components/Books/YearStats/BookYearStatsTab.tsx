import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { BookYearStatCard } from './BookYearStatCard';
import { BookYearStatModel } from '../../../models/BookYearStatModel';
import { statApi } from '../../../api/statApi';

export const BookYearStatsTab = () => {
  const { getBookYearStats } = statApi();
  const [bookYearStats, setBookYearStats] = useState<BookYearStatModel[]>([]);
  const [bookYearStatsCount, setBookYearStatsCount] = useState<number>(0);
  const take = 12;

  const get = async (page: number, search: string) => {
    const { data, count } = await getBookYearStats(page, take, search);
    setBookYearStats(data);
    setBookYearStatsCount(count);
  };

  useEffect(() => {
    get(0, '');
  }, []);

  return (
    <List count={bookYearStatsCount} onGet={get} take={take}>
      {bookYearStats.map((yearStat: BookYearStatModel) => (
        <BookYearStatCard
          key={`${yearStat.userId}-${yearStat.year}`}
          yearStat={yearStat}
        />
      ))}
    </List>
  );
};
