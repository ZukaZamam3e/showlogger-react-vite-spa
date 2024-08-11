import {
  Box,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ReactNode, useEffect, useState } from 'react';
import { SearchResultsModel } from '../../models/SearchResultsModel';
import { SLTextField } from '../Common/SLTextField';
import { infoApi } from '../../api/infoApi';
import { SearchShowModel } from '../../models/SearchShowModel';

export interface SearchApiProps {
  children?: ReactNode;
  onSetSearchResults: (searchResults: SearchResultsModel[]) => void;
  searchShow?: SearchShowModel | null;
}

export const SearchApi = (props: SearchApiProps) => {
  const { searchApi } = infoApi();
  const [name, setName] = useState(
    !!props.searchShow ? props.searchShow.name : '',
  );
  const [type, setType] = useState(
    !!props.searchShow ? props.searchShow.type : 0,
  );

  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: number,
  ) => {
    setType(newValue);
  };

  const handleSearchClick = async () => {
    const searchResults = await searchApi(0, type, name);
    props.onSetSearchResults(searchResults);
  };

  useEffect(() => {
    if (!!props.searchShow) {
      handleSearchClick();
    }
  }, []);

  return (
    <>
      <Grid container spacing={3} alignItems="center">
        <Grid xs={12}>
          <Paper
            sx={{
              borderStyle: 'solid',
              borderWidth: '2px',
              borderColor: 'white',
              borderRadius: 3,
              mt: 1,
              mb: 2,
              width: '90vw',
              padding: 3,
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid xs={12}>
                <SLTextField
                  fullWidth
                  name="showName"
                  label="Name"
                  defaultValue={name}
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={12}>
                <ToggleButtonGroup
                  color="primary"
                  exclusive
                  value={type}
                  onChange={handleTypeChange}
                  fullWidth
                >
                  <ToggleButton value={0}>TV</ToggleButton>
                  <ToggleButton value={1}>MOVIE</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={handleSearchClick}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'grid',
          columnGap: '30px',
          rowGap: '30px',
          paddingBottom: '52px',
          m: 'auto',
          mb: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
            lg: '1fr 1fr 1fr',
            xl: '1fr 1fr 1fr 1fr',
          },
        }}
      >
        {props.children}
      </Box>
    </>
  );
};
