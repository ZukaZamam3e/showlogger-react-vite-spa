import {
  Box,
  Button,
  Card,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { protectedResources } from '../../config/apiConfig';
import { SearchResultsModel } from '../../models/SearchResultsModel';
import { LookUpCard } from './LookUpCard';

export interface ShowLookUpProps {
  onWatchResult: (searchResult: SearchResultsModel, watchlist: boolean) => void;
}

export const ShowLookUp = (props: ShowLookUpProps) => {
  const { postData } = useFetch();
  const [searchResults, setSearchResults] = useState<SearchResultsModel[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: number,
  ) => {
    setType(newValue);
  };

  const handleSearchClick = async () => {
    setIsLoading(true);
    await postData(
      `${protectedResources.oaprojectsApi.infoEndpoint}/searchapi`,
      {
        api: 0,
        type: type,
        name: name,
      },
    )
      .then(json => {
        setSearchResults(json.model.searchResults);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Grid container spacing={3} alignItems="center">
        <Grid xs={0} sm={2} md={4}></Grid>
        <Grid xs={12} sm={8} md={4}>
          <Paper
            sx={{
              borderStyle: 'solid',
              borderWidth: '2px',
              borderColor: 'white',
              borderRadius: 3,
              maxWidth: 900,
              // width: {
              //     xs: "86.5vw",
              //     lg: "900px",
              //     xl: "900px"
              // },
              m: 2,
              padding: 3,
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid xs={12}>
                <TextField
                  fullWidth
                  name="showName"
                  label="Name"
                  defaultValue={name}
                  // defaultValue={show.showName}
                  onChange={e => {
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
        <Grid xs={0} sm={2} md={4}></Grid>
      </Grid>

      <Box
        sx={{
          width: {
            xs: '95vw',
            sm: '90vw',
          },
          display: 'grid',
          columnGap: '30px',
          rowGap: '30px',
          paddingBottom: '52px',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
            lg: '1fr 1fr 1fr 1fr',
            xl: '1fr 1fr 1fr 1fr 1fr',
          },
        }}
      >
        {searchResults.map((searchResult: SearchResultsModel) => (
          <LookUpCard
            key={searchResult.id}
            searchResult={searchResult}
            onWatchResult={props.onWatchResult}
          />
        ))}
      </Box>
    </>
  );
};
