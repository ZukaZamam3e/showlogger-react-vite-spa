import {
  Box,
  Button,
  Fab,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import { placements } from '../../config/placementConfig';
import { CodeValueModel } from '../../models/CodeValueModel';
import { WatchListModel } from '../../models/WatchListModel';
import dayjs from 'dayjs';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { SLTextField } from '../Common/SLTextField';

interface EditWatchListProps {
  watchlist: WatchListModel;
  showTypeIds: CodeValueModel[];
  onCancelSelectedWatchlist: () => void;
  onWatchlistSave: (watchlist: WatchListModel) => void;
}

export const EditWatchList = (props: EditWatchListProps) => {
  const [watchlist, setWatchList] = useState<WatchListModel>(props.watchlist);
  const [seasonNumber, setSeasonNumber] = useState(
    props.watchlist.seasonNumber ?? 1,
  );
  const [episodeNumber, setEpisodeNumber] = useState(
    props.watchlist.episodeNumber ?? 1,
  );

  const handleChange = (e: any) => {
    const updatedWatchlist = () => {
      if (
        e.target.name === 'seasonNumber' ||
        e.target.name === 'episodeNumber'
      ) {
        let value = parseInt(e.target.value);

        if (e.target.name === 'seasonNumber') {
          setSeasonNumber(value);
        } else {
          setEpisodeNumber(value);
        }

        return { ...watchlist, [e.target.name]: value };
      } else {
        return { ...watchlist, [e.target.name]: e.target.value };
      }
    };

    setWatchList(updatedWatchlist());
  };

  const handleWatchlistDateChange = (value: any) => {
    const updatedWatchlist = { ...watchlist, ['dateWatched']: value.toDate() };
    setWatchList(updatedWatchlist);
  };

  const handleShowTypeIdChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: number,
  ) => {
    const updatedWatchlist = { ...watchlist, ['showTypeId']: newValue };
    setWatchList(updatedWatchlist);
  };

  const handleAddSeasonNumber = () => {
    const updatedWatchlist = {
      ...watchlist,
      ['seasonNumber']: (watchlist.seasonNumber ?? 0) + 1,
    };
    setWatchList(updatedWatchlist);
    setSeasonNumber(() => updatedWatchlist.seasonNumber);
  };

  const handleResetEpisodeNumber = () => {
    const updatedWatchlist = { ...watchlist, ['episodeNumber']: 1 };
    setWatchList(updatedWatchlist);
    setEpisodeNumber(() => updatedWatchlist.episodeNumber);
  };

  const handleWatchlistSave = () => {
    const saveData: WatchListModel = { ...watchlist };

    if (saveData.showTypeId != 1000) {
      saveData.episodeNumber = undefined;
      saveData.seasonNumber = undefined;
    }

    props.onWatchlistSave(saveData);
  };

  return (
    <Box
      sx={{
        paddingBottom: {
          xs: '185px',
          sm: '185px',
          md: '52px',
          lg: '52px',
        },
      }}
    >
      <Paper
        sx={{
          borderStyle: 'solid',
          borderWidth: '2px',
          borderColor: 'white',
          borderRadius: 3,
          m: 2,
          padding: 3,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid xs={12}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Date Added"
              value={dayjs(watchlist.dateAdded)}
              onChange={value => handleWatchlistDateChange(value)}
            />
          </Grid>
          <Grid xs={12}>
            <SLTextField
              fullWidth
              name="showName"
              label="Name"
              defaultValue={watchlist.showName}
              onChange={handleChange}

            />
          </Grid>
          <Grid xs={12}>
            <SLTextField
              fullWidth
              name="showNotes"
              label="Notes"
              multiline
              defaultValue={watchlist.showNotes}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12}>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={watchlist.showTypeId}
              onChange={handleShowTypeIdChange}
              fullWidth
            >
              {props.showTypeIds.map(showTypeId => (
                <ToggleButton
                  value={showTypeId.codeValueId}
                  key={showTypeId.codeValueId}
                >
                  {showTypeId.decodeTxt}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          {watchlist.showTypeId == 1000 && (
            <Grid container spacing={3} xs={6}>
              <Grid xs={12} sm={6}>
                <SLTextField
                  fullWidth
                  name="seasonNumber"
                  label="Season"
                  type="number"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  value={seasonNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ height: '100%' }}
                  onClick={handleAddSeasonNumber}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          )}
          {watchlist.showTypeId == 1000 && (
            <Grid container spacing={3} xs={6}>
              <Grid xs={12} sm={6}>
                <SLTextField
                  fullWidth
                  name="episodeNumber"
                  label="Episode"
                  type="number"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  value={episodeNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <Button
                  variant="contained"
                  disableElevation
                  fullWidth
                  sx={{ height: '100%' }}
                  onClick={handleResetEpisodeNumber}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Fab
          sx={{
            position: 'fixed',
            bottom: placements.fab.firstIconBottom,
            right: placements.fab.right,
          }}
          color="success"
          aria-label="add"
          onClick={handleWatchlistSave}
        >
          <SaveIcon />
        </Fab>
        <Fab
          sx={{
            position: 'fixed',
            bottom: placements.fab.secondIconBottom,
            right: placements.fab.right,
          }}
          color="error"
          aria-label="add"
          onClick={props.onCancelSelectedWatchlist}
        >
          <CancelIcon />
        </Fab>
      </Paper>
    </Box>
  );
};
