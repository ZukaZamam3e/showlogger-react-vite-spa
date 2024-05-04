import { useEffect, useState } from 'react';
import { TvStatModel } from '../../models/TvStatModel';
import { protectedResources } from '../../config/apiConfig';
import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { ErrorMessage } from '../ErrorMessage';
import {
  Backdrop,
  Box,
  CircularProgress,
  Fab,
  Pagination,
  Stack,
  useTheme,
} from '@mui/material';
import { ListSearch } from '../ListSearch';
import { placements } from '../../config/placementConfig';
import SearchIcon from '@mui/icons-material/Search';
import { MovieStatCard } from './MovieStatCard';
import { MovieStatModel } from '../../models/MovieStatModel';
import { List } from '../List';

interface MovieStatsTabProps {
  isMobile: boolean;
}

export const MovieStatsTab = (props: MovieStatsTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const { getData } = useFetch();
  const [movieStats, setMovieStats] = useState<MovieStatModel[]>([]);
  const [movieStatsCount, setMovieStatsCount] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchTimer, setSearchTimer] = useState<any>(null);
  const take = 12;
  let pages = movieStatsCount && Math.floor(movieStatsCount / take);
  if (movieStatsCount % take >= 1) {
    pages += 1;
  }
  const siblingCount = props.isMobile ? 0 : 1;

  const get = async (page: number, search: string) => {
    setIsLoading(true);
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.statEndpoint}/getmoviestats?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(data => (data ? data.json() : null))
      .then(json => {
        if (json.errors.length == 0) {
          setMovieStats(json.model.movieStats);
          setMovieStatsCount(json.model.count);
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
  useEffect(() => {
    get(0, '');
  }, []);

  //   const handlePageOnChange = (_: React.ChangeEvent<unknown>, value: number) => {
  //     setPage(() => value);
  //     get(value - 1, searchText);
  //   };

  //   const handleToggleSearch = () => {
  //     setIsSearching(prev => {
  //       if (prev) {
  //         handleSearchUpdate('');
  //       }
  //       return !prev;
  //     });
  //   };

  //   const clearSearch = () => {
  //     setIsSearching(false);
  //     setSearchText('');
  //     clearTimeout(searchTimer);
  //     setSearchTimer(null);
  //   };

  //   const handleSearchUpdate = (text: string) => {
  //     setSearchText(text);

  //     if (!!searchTimer) {
  //       clearTimeout(searchTimer);
  //       setSearchTimer(null);
  //     }

  //     if (searchText !== '') {
  //       const timer = setTimeout(() => {
  //         setPage(1);
  //         get(0, text);
  //       }, 250);

  //       setSearchTimer(timer);
  //     }
  //   };

  const handleCloseErrors = () => {
    setErrors([]);
    setHasError(false);
  };

  //   let body = (
  //     <>
  //       <Box
  //         sx={{
  //           width: '90vw',
  //         }}
  //       >
  //         <Box
  //           sx={{
  //             display: 'grid',
  //             columnGap: '10px',
  //             rowGap: '10px',
  //             paddingBottom: {
  //               xs: '185px',
  //               sm: '185px',
  //               md: '52px',
  //               lg: '52px',
  //             },
  //             gridTemplateColumns: {
  //               xs: '1fr',
  //               sm: '1fr 1fr',
  //               md: '1fr 1fr 1fr',
  //               lg: '1fr 1fr 1fr 1fr',
  //               xl: '1fr 1fr 1fr 1fr 1fr 1fr',
  //             },
  //           }}
  //         >
  //           {movieStats.map((movieStat: MovieStatModel) => (
  //             <MovieStatCard key={movieStat.showId} movieStat={movieStat} />
  //           ))}
  //         </Box>
  //         <Stack
  //           alignItems="center"
  //           sx={{
  //             position: 'fixed',
  //             bottom: 0,
  //             right: 0,
  //             left: 0,
  //             height: {
  //               xs: 54,
  //               sm: 42,
  //             },
  //             //paddingTop: 7,
  //             backgroundColor: theme.palette.secondary.dark,
  //           }}
  //         >
  //           <Pagination
  //             sx={{
  //               paddingTop: '7px',
  //             }}
  //             size="small"
  //             siblingCount={siblingCount}
  //             count={pages}
  //             page={page}
  //             onChange={handlePageOnChange}
  //           />
  //         </Stack>
  //         {isSearching ? (
  //           <>
  //             <ListSearch
  //               searchText={searchText}
  //               onCancelSearch={handleToggleSearch}
  //               onSearchUpdate={handleSearchUpdate}
  //             />
  //           </>
  //         ) : (
  //           <>
  //             <Fab
  //               sx={{
  //                 position: 'fixed',
  //                 bottom: placements.fab.firstIconBottom,
  //                 right: placements.fab.right,
  //               }}
  //               color="success"
  //               aria-label="add"
  //               onClick={handleToggleSearch}
  //             >
  //               <SearchIcon />
  //             </Fab>
  //           </>
  //         )}
  //       </Box>
  //     </>
  //   );

  return (
    <>
      <List count={movieStatsCount} isMobile={props.isMobile} onGet={get}>
        {movieStats.map((movieStat: MovieStatModel) => (
          <MovieStatCard key={movieStat.showId} movieStat={movieStat} />
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
