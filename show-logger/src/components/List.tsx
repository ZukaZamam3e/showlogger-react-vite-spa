import { useEffect, useState, ReactNode } from 'react';
import { Box, Fab, Pagination, Stack, useTheme } from '@mui/material';
import { placements } from '../config/placementConfig';
import SearchIcon from '@mui/icons-material/Search';
import { ListSearch } from './ListSearch';

interface ListProps {
  children: ReactNode;
  isMobile: boolean;
  count: number;
  take: number;
  onGet?: (page: number, searchText: string) => void;
  onToggleSearch?: () => void;
  clearSearch?: boolean;
  hideSearch?: boolean;
  hidePagination?: boolean;
}

export const List = (props: ListProps) => {
  const theme = useTheme();
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchTimer, setSearchTimer] = useState<any>(null);
  let pages = props.count && Math.floor(props.count / props.take);
  if (props.count % props.take >= 1) {
    pages += 1;
  }

  useEffect(() => {
    clearSearch();
  }, [props.clearSearch]);

  const siblingCount = props.isMobile ? 0 : 1;

  const handlePageOnChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(() => value);
    if (props.onGet != null) {
      props.onGet(value - 1, searchText);
    }
  };

  const handleToggleSearch = () => {
    setIsSearching(prev => {
      if (prev) {
        handleSearchUpdate('');
      }

      if (!!props.onToggleSearch) {
        props.onToggleSearch();
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
        if (props.onGet != null) {
          props.onGet(0, text);
        }
      }, 250);

      setSearchTimer(timer);
    }
  };

  const hidePagination =
    props.hidePagination != null ? props.hidePagination : false;
  const hideSearch = props.hideSearch != null ? props.hideSearch : false;

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
        {!hidePagination && (
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
        )}
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
            {!hideSearch && (
              <Fab
                sx={{
                  position: 'fixed',
                  bottom: placements.fab.firstIconBottom,
                  right: placements.fab.right,
                }}
                color="info"
                aria-label="add"
                onClick={handleToggleSearch}
              >
                <SearchIcon />
              </Fab>
            )}
          </>
        )}
      </Box>
    </>
  );
};
