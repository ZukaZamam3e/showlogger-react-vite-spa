import { useEffect, useState } from 'react';
import { TvStatModel } from '../../models/TvStatModel';
import { protectedResources } from '../../config/apiConfig';
import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { ErrorMessage } from '../ErrorMessage';
import { Backdrop, CircularProgress, useTheme } from '@mui/material';
import { TvStatCard } from './TvStatCard';
import { List } from '../List';

interface TvStatsTabProps {
  isMobile: boolean;
}

export const TvStatsTab = (props: TvStatsTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const { getData, postData } = useFetch();
  const [tvStats, setTvStats] = useState<TvStatModel[]>([]);
  const [tvStatsCount, setTvStatsCount] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const take = 12;

  const get = async (page: number, search: string) => {
    setIsLoading(true);
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.statEndpoint}/gettvstats?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setTvStats(json.model.tvStats);
          setTvStatsCount(json.model.count);
        } else {
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddNextEpisode = async (showId: number) => {
    setClearSearch(prev => !prev);
    setIsLoading(true);
    await postData(
      `${protectedResources.oaprojectsApi.showEndpoint}/addNextEpisode`,
      {
        showId: showId,
        dateWatched: new Date(),
      },
    )
      .then(data => (data ? data.json() : null))
      .then(async json => {
        if (json.errors.length == 0) {
          await get(0, '');
        } else {
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });

    await get(0, '');
  };

  useEffect(() => {
    get(0, '');
  }, []);

  // const handlePageOnChange = (_: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(() => value);
  //   get(value - 1, searchText);
  // };

  // const handleToggleSearch = () => {
  //   setIsSearching(prev => {
  //     if (prev) {
  //       handleSearchUpdate('');
  //     }
  //     return !prev;
  //   });
  // };

  // const clearSearch = () => {
  //   setIsSearching(false);
  //   setSearchText('');
  //   clearTimeout(searchTimer);
  //   setSearchTimer(null);
  // };

  // const handleSearchUpdate = (text: string) => {
  //   setSearchText(text);

  //   if (!!searchTimer) {
  //     clearTimeout(searchTimer);
  //     setSearchTimer(null);
  //   }

  //   if (searchText !== '') {
  //     const timer = setTimeout(() => {
  //       setPage(1);
  //       get(0, text);
  //     }, 250);

  //     setSearchTimer(timer);
  //   }
  // };

  const handleCloseErrors = () => {
    setErrors([]);
    setHasError(false);
  };

  // let body = (
  //   <>
  //     <Box
  //       sx={{
  //         width: '90vw',
  //       }}
  //     >
  //       <Box
  //         sx={{
  //           display: 'grid',
  //           columnGap: '10px',
  //           rowGap: '10px',
  //           paddingBottom: {
  //             xs: '185px',
  //             sm: '185px',
  //             md: '52px',
  //             lg: '52px',
  //           },
  //           gridTemplateColumns: {
  //             xs: '1fr',
  //             sm: '1fr 1fr',
  //             md: '1fr 1fr 1fr',
  //             lg: '1fr 1fr 1fr 1fr',
  //             xl: '1fr 1fr 1fr 1fr 1fr 1fr',
  //           },
  //         }}
  //       >
  //         {tvStats.map((tvStat: TvStatModel) => (
  //           <TvStatCard
  //             key={tvStat.showId}
  //             tvStat={tvStat}
  //             onAddNextEpisode={handleAddNextEpisode}
  //           />
  //         ))}
  //       </Box>
  //       <Stack
  //         alignItems="center"
  //         sx={{
  //           position: 'fixed',
  //           bottom: 0,
  //           right: 0,
  //           left: 0,
  //           height: {
  //             xs: 54,
  //             sm: 42,
  //           },
  //           //paddingTop: 7,
  //           backgroundColor: theme.palette.secondary.dark,
  //         }}
  //       >
  //         <Pagination
  //           sx={{
  //             paddingTop: '7px',
  //           }}
  //           size="small"
  //           siblingCount={siblingCount}
  //           count={pages}
  //           page={page}
  //           onChange={handlePageOnChange}
  //         />
  //       </Stack>
  //       {isSearching ? (
  //         <>
  //           <ListSearch
  //             searchText={searchText}
  //             onCancelSearch={handleToggleSearch}
  //             onSearchUpdate={handleSearchUpdate}
  //           />
  //         </>
  //       ) : (
  //         <>
  //           <Fab
  //             sx={{
  //               position: 'fixed',
  //               bottom: placements.fab.firstIconBottom,
  //               right: placements.fab.right,
  //             }}
  //             color="success"
  //             aria-label="add"
  //             onClick={handleToggleSearch}
  //           >
  //             <SearchIcon />
  //           </Fab>
  //         </>
  //       )}
  //     </Box>
  //   </>
  // );

  return (
    <>
      <List
        count={tvStatsCount}
        isMobile={props.isMobile}
        onGet={get}
        clearSearch={clearSearch}
      >
        {tvStats.map((tvStat: TvStatModel) => (
          <TvStatCard
            key={tvStat.showId}
            tvStat={tvStat}
            onAddNextEpisode={handleAddNextEpisode}
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
