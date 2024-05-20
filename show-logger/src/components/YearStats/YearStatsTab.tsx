import { useEffect, useState } from 'react';
import { protectedResources } from '../../config/apiConfig';
import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { ErrorMessage } from '../ErrorMessage';
import { Backdrop, CircularProgress, Fab } from '@mui/material';
import { YearStatCard } from './YearStatCard';
import { YearStatModel } from '../../models/YearStatModel';
import { List } from '../List';
import { YearStatDataModel } from '../../models/YearStatDataModel';
import { YearStatDataCard } from './YearStatDataCard';
import { placements } from '../../config/placementConfig';
import CancelIcon from '@mui/icons-material/Cancel';

interface YearStatsTabProps {
  isMobile: boolean;
}

export const YearStatsTab = (props: YearStatsTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getData } = useFetch();
  const [yearStats, setYearStats] = useState<YearStatModel[]>([]);
  const [yearStatsCount, setYearStatsCount] = useState<number>(0);

  const [name, setName] = useState<string>('');
  const [year, setYear] = useState<number>();
  const [yearStatData, setYearStatData] = useState<YearStatDataModel[]>([]);
  const [yearStatDataCount, setYearStatDataCount] = useState<number>(0);

  const [errors, setErrors] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);
  const take = 18;

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

  const handleSelect = (yearStat: YearStatModel) => {
    setYearStatData(yearStat.data);
    setYearStatDataCount(yearStat.data.length);
    setName(yearStat.name);
    setYear(yearStat.year);
  };

  const handleCloseErrors = () => {
    setErrors([]);
    setHasError(false);
  };

  const handleCancelData = () => {
    setYearStatData([]);
    setYearStatDataCount(0);
    setName('');
    setYear(0);
  };

  const tvData = yearStatData.filter(m => m.showTypeId == 1000);
  const movieData = yearStatData.filter(m => m.showTypeId == 1001);
  const amcData = yearStatData.filter(m => m.showTypeId == 1002);

  let body;

  if (yearStatDataCount > 0) {
    body = (
      <>
        <h1>
          {year} - {name}
        </h1>
        <hr />
        {tvData.length > 0 && (
          <>
            <h2>TV Shows</h2>
            <List
              count={tvData.length}
              isMobile={props.isMobile}
              take={take}
              hideSearch={true}
              hidePagination={true}
            >
              {tvData.map((yearStatData: YearStatDataModel) => (
                <YearStatDataCard
                  key={`${yearStatData.showName}`}
                  yearStatData={yearStatData}
                />
              ))}
            </List>
            <hr />
          </>
        )}
        {movieData.length > 0 && (
          <>
            <h2>Movies</h2>
            <List
              count={movieData.length}
              isMobile={props.isMobile}
              hideSearch={true}
              hidePagination={true}
              take={take}
            >
              {movieData.map((yearStatData: YearStatDataModel) => (
                <YearStatDataCard
                  key={`${yearStatData.showName}`}
                  yearStatData={yearStatData}
                />
              ))}
            </List>
            <hr />
          </>
        )}
        {amcData.length > 0 && (
          <>
            <h2>AMC</h2>
            <List
              count={amcData.length}
              isMobile={props.isMobile}
              hideSearch={true}
              hidePagination={true}
              take={take}
            >
              {amcData.map((yearStatData: YearStatDataModel) => (
                <YearStatDataCard
                  key={`${yearStatData.showName}`}
                  yearStatData={yearStatData}
                />
              ))}
            </List>
          </>
        )}
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
      <List
        count={yearStatsCount}
        isMobile={props.isMobile}
        onGet={get}
        take={take}
      >
        {yearStats.map((yearStat: YearStatModel) => (
          <YearStatCard
            key={`${yearStat.userId}-${yearStat.year}`}
            yearStat={yearStat}
            onSelect={handleSelect}
          />
        ))}
      </List>
    );
  }

  return (
    <>
      {body}
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
