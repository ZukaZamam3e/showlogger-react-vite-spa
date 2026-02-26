import {
  Box,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { ReactNode, useEffect, useState } from 'react';
import { SLTextField } from '../Common/SLTextField';
import { SearchResultsModel } from '../../models/SearchResultsModel';
import { SearchShowModel } from '../../models/SearchShowModel';
import { infoApi } from '../../api/infoApi';

export interface BatchSearchApiProps {
  children?: ReactNode;
  onSetSearchResults: (searchResults: SearchResultsModel[]) => void;
}

export const BatchSearchApi = (props: BatchSearchApiProps) => {
  const { searchApi } = infoApi();
  const [name, setName] = useState('');

  const handleSearchClick = async () => {
    const tvSearchResults = await searchApi(0, 0, name);
    const movieSearchResults = await searchApi(0, 1, name);
    props.onSetSearchResults([...tvSearchResults, ...movieSearchResults]);
  };

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
