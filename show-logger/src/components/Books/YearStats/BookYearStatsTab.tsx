import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { BookYearStatCard } from './BookYearStatCard';
import { BookYearStatModel } from '../../../models/BookYearStatModel';
import { statApi } from '../../../api/statApi';
import { BookYearStatDataModel } from '../../../models/BookYearStatDataModel';
import { Fab } from '@mui/material';
import { placements } from '../../../config/placementConfig';
import CancelIcon from '@mui/icons-material/Cancel';
import { BookYearStatDataCard } from './BookYearStatDataCard';

export const BookYearStatsTab = () => {
  const { getBookYearStats } = statApi();
  const [bookYearStats, setBookYearStats] = useState<BookYearStatModel[]>([]);
  const [bookYearStatsCount, setBookYearStatsCount] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [year, setYear] = useState<number>();
  const [yearStatData, setYearStatData] = useState<BookYearStatDataModel[]>([]);
  const [yearStatDataCount, setYearStatDataCount] = useState<number>(0);
  const take = 12;

  const get = async (page: number, search: string) => {
    const { data, count } = await getBookYearStats(page, take, search);
    setBookYearStats(data);
    setBookYearStatsCount(count);
  };

  const handleSelect = (yearStat: BookYearStatModel) => {
    setYearStatData(yearStat.data);
    setYearStatDataCount(yearStat.data.length);
    setName(yearStat.name);
    setYear(yearStat.year);
  };

  const handleCancelData = () => {
    setYearStatData([]);
    setYearStatDataCount(0);
    setName('');
    setYear(0);
  };

  useEffect(() => {
    get(0, '');
  }, []);

  let body;

  if (yearStatDataCount > 0) {
    const months = yearStatData.map(m => m.month);
    const monthCnt = Math.max(...months);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let monthData = [];

    const today = new Date();

    let currentMonth = new Date().getMonth() + 1;

    if (year != today.getFullYear()) {
      currentMonth = 12;
    }
    for (let i = 1; i <= currentMonth; ++i) {
      monthData.push({
        month: i,
        data: yearStatData.filter(m => m.month == i),
      });
    }

    body = (
      <>
        <h1>
          {year} - {name}
        </h1>
        <h2></h2>
        <hr />
        {monthData.map(md => (
          <>
            <h2>{monthNames[md.month - 1]}</h2>
            <h3>{`${md.data.length} book${md.data.length !== 1 ? 's' : ''}`}</h3>
            <List
              count={md.data.length}
              take={take}
              hideSearch={true}
              hidePagination={true}
            >
              {md.data.map(d => (
                <BookYearStatDataCard yearStatData={d} />
              ))}
            </List>
            <hr />
          </>
        ))}
        <Fab
          sx={{
            position: 'fixed',
            bottom: placements.fab.firstIconBottom,
            right: placements.fab.right,
          }}
          color="error"
          aria-label="add"
          onClick={handleCancelData}
        >
          <CancelIcon />
        </Fab>
      </>
    );
  } else {
    body = (
      <List count={bookYearStatsCount} onGet={get} take={take}>
        {bookYearStats.map((yearStat: BookYearStatModel) => (
          <BookYearStatCard
            key={`${yearStat.userId}-${yearStat.year}`}
            yearStat={yearStat}
            onSelect={handleSelect}
          />
        ))}
      </List>
    );
  }

  return <>{body}</>;
};
