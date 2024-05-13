import { useEffect, useState } from 'react';
import { protectedResources } from '../../config/apiConfig';
import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { ErrorMessage } from '../ErrorMessage';
import { Backdrop, CircularProgress } from '@mui/material';
import { YearStatCard } from './YearStatCard';
import { YearStatModel } from '../../models/YearStatModel';
import { List } from '../List';

interface YearStatsTabProps {
  isMobile: boolean;
}

export const YearStatsTab = (props: YearStatsTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getData } = useFetch();
  const [yearStats, setYearStats] = useState<YearStatModel[]>([]);
  const [yearStatsCount, setYearStatsCount] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);
  const take = 18;
  let pages = yearStatsCount && Math.floor(yearStatsCount / take);
  if (yearStatsCount % take >= 1) {
    pages += 1;
  }

  const get = async (page: number, search: string) => {
    setIsLoading(true);
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.statEndpoint}/getyearstats?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setYearStats(json.model.yearStats);
          setYearStatsCount(json.model.count);
        } else {
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    get(0, '');
  }, []);

  const handleCloseErrors = () => {
    setErrors([]);
    setHasError(false);
  };

  return (
    <>
      <List count={yearStatsCount} isMobile={props.isMobile} onGet={get}>
        {yearStats.map((yearStat: YearStatModel) => (
          <YearStatCard
            key={`${yearStat.userId}-${yearStat.year}`}
            yearStat={yearStat}
          />
        ))}
      </List>
      <ErrorMessage
        open={hasError}
        onClose={handleCloseErrors}
        errors={errors}
      />
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
