import { useEffect, useState, ReactNode } from 'react';
import {
  Backdrop,
  Box,
  CircularProgress,
  Fab,
  Pagination,
  Stack,
  useTheme,
} from '@mui/material';
import { placements } from '../config/placementConfig';
import SearchIcon from '@mui/icons-material/Search';
import { ListSearch } from './ListSearch';

interface ListProps {
  children: ReactNode;
  isMobile: boolean;
  count: number;
  onGet: (page: number, searchText: string) => void;
  clearSearch?: boolean;
}

export const List = (props: ListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const [errors, setErrors] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchTimer, setSearchTimer] = useState<any>(null);
  const take = 12;
  let pages = props.count && Math.floor(props.count / take);
  if (props.count % take >= 1) {
    pages += 1;
  }

  useEffect(() => {
    clearSearch();
  }, [props.clearSearch]);

  const siblingCount = props.isMobile ? 0 : 1;

  const handlePageOnChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(() => value);
    props.onGet(value - 1, searchText);
  };

  const handleToggleSearch = () => {
    setIsSearching(prev => {
      if (prev) {
        handleSearchUpdate('');
      }
      return !prev;
    });
  };

  const clearSearch = () => {
    setIsSearching(false);
    setSearchText('');
    clearTimeout(searchTimer);
    setSearchTimer(null);
  };

  const handleSearchUpdate = (text: string) => {
    setSearchText(text);

    if (!!searchTimer) {
      clearTimeout(searchTimer);
      setSearchTimer(null);
    }

    if (searchText !== '') {
      const timer = setTimeout(() => {
        setPage(1);
        props.onGet(0, text);
      }, 250);

      setSearchTimer(timer);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: '90vw',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            columnGap: '10px',
            rowGap: '10px',
            paddingBottom: {
              xs: '185px',
              sm: '185px',
              md: '52px',
              lg: '52px',
            },
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
              lg: '1fr 1fr 1fr 1fr',
              xl: '1fr 1fr 1fr 1fr 1fr 1fr',
            },
          }}
        >
          {props.children}
        </Box>
        <Stack
          alignItems="center"
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            left: 0,
            height: {
              xs: 54,
              sm: 42,
            },
            //paddingTop: 7,
            backgroundColor: theme.palette.secondary.dark,
          }}
        >
          <Pagination
            sx={{
              paddingTop: '7px',
            }}
            size="small"
            siblingCount={siblingCount}
            count={pages}
            page={page}
            onChange={handlePageOnChange}
          />
        </Stack>
        {isSearching ? (
          <>
            <ListSearch
              searchText={searchText}
              onCancelSearch={handleToggleSearch}
              onSearchUpdate={handleSearchUpdate}
            />
          </>
        ) : (
          <>
            <Fab
              sx={{
                position: 'fixed',
                bottom: placements.fab.firstIconBottom,
                right: placements.fab.right,
              }}
              color="success"
              aria-label="add"
              onClick={handleToggleSearch}
            >
              <SearchIcon />
            </Fab>
          </>
        )}
      </Box>
    </>
  );
};
