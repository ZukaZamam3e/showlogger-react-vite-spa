import {
  Box,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ReactNode, useState } from 'react';
import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { protectedResources } from '../../config/apiConfig';
import { SearchResultsModel } from '../../models/SearchResultsModel';
import { SLTextField } from '../Common/SLTextField';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../slices/isLoadingSlice';
import { SearchCard } from './SearchCard';

export interface SearchApiProps {
  children?: ReactNode;
  onSetSearchResults: (searchResults: SearchResultsModel[]) => void;
}

export const SearchApi = (props: SearchApiProps) => {
  const dispatch = useDispatch();
  const { postData } = useFetch();
  const [name, setName] = useState('');
  const [type, setType] = useState(0);

  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: number,
  ) => {
    setType(newValue);
  };

  const handleSearchClick = async () => {
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.infoEndpoint}/searchapi`,
      {
        api: 0,
        type: type,
        name: name,
      },
    )
      .then(json => {
        props.onSetSearchResults(json.model.searchResults);
      })
      .catch(() => {})
      .finally(() => {
        dispatch(stopLoading());
      });
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
              m: 2,
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
