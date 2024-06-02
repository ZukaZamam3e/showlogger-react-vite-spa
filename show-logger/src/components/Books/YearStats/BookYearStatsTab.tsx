import { useEffect, useState } from 'react';
import { protectedResources } from '../../../config/apiConfig';
import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
import { List } from '../../Common/List';
import { BookYearStatCard } from './BookYearStatCard';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showErrors } from '../../../slices/errorsSlice';
import { BookYearStatModel } from '../../../models/BookYearStatModel';

export const BookYearStatsTab = () => {
  const dispatch = useDispatch();
  const { getData } = useFetch();
  const [bookYearStats, setBookYearStats] = useState<BookYearStatModel[]>([]);
  const [bookYearStatsCount, setBookYearStatsCount] = useState<number>(0);
  const take = 12;

  const get = async (page: number, search: string) => {
    dispatch(startLoading());
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.statEndpoint}/getbookyearstats?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setBookYearStats(json.model.bookYearStats);
          setBookYearStatsCount(json.model.count);
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
