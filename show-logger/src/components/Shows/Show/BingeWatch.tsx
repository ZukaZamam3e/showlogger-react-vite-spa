import { Box, Button, Fab, Paper, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ShowModel } from '../../../models/ShowModel';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { BingeWatchModel } from '../../../models/BingeWatchModel';
import { placements } from '../../../config/placementConfig';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { SLTextField } from '../../Common/SLTextField';

export interface BingeWatchProps {
  show: ShowModel;
  onCancelBinge: () => void;
  onBingeSave: (binge: BingeWatchModel) => void;
}

export const BingeWatch = (props: BingeWatchProps) => {
  const [binge, setBinge] = useState<BingeWatchModel>({
    showName: props.show.showName ?? '',
    seasonNumber: props.show.seasonNumber ?? 1,
    startEpisode: (props.show.episodeNumber ?? 1) + 1,
    endEpisode: (props.show.episodeNumber ?? 1) + 2,
    dateWatched: new Date(),
  });

  const [seasonNumber, setSeasonNumber] = useState(
    props.show.seasonNumber ?? 1,
  );
  const [startEpisode, setStartEpisode] = useState(
    (props.show.episodeNumber ?? 1) + 1,
  );
  const [endEpisode, setEndEpisode] = useState(
    (props.show.episodeNumber ?? 1) + 2,
  );
  const handleChange = (e: any) => {
    const updatedShow = () => {
      if (
        e.target.name === 'seasonNumber' ||
        e.target.name === 'startEpisode' ||
        e.target.name === 'endEpisode'
      ) {
        let value = parseInt(e.target.value);

        if (e.target.name === 'seasonNumber') {
          setSeasonNumber(value);
        } else if (e.target.name === 'startEpisode') {
          setStartEpisode(value);
        } else if (e.target.name === 'endEpisode') {
          setEndEpisode(value);
        }

        return { ...binge, [e.target.name]: value };
      } else {
        return { ...binge, [e.target.name]: e.target.value };
      }
    };

    setBinge(updatedShow());
  };

  const handleAddSeasonNumber = () => {
    const updatedBinge = {
      ...binge,
      ['seasonNumber']: binge.seasonNumber + 1,
    };
    setBinge(updatedBinge);
    setSeasonNumber(() => updatedBinge.seasonNumber);
  };

  const handleSubtractSeasonNumber = () => {
    const updatedBinge = {
      ...binge,
      ['seasonNumber']: binge.seasonNumber - 1,
    };
    setBinge(updatedBinge);
    setSeasonNumber(() => updatedBinge.seasonNumber);
  };

  const handleAddStartEpisode = () => {
    const updatedBinge = {
      ...binge,
      ['startEpisode']: binge.startEpisode + 1,
    };
    setBinge(updatedBinge);
    setStartEpisode(() => updatedBinge.startEpisode);
  };

  const handleSubtractStartEpisode = () => {
    const updatedBinge = {
      ...binge,
      ['startEpisode']: binge.startEpisode - 1,
    };
    setBinge(updatedBinge);
    setStartEpisode(() => updatedBinge.startEpisode);
  };

  const handleAddEndEpisode = () => {
    const updatedBinge = {
      ...binge,
      ['startEpisode']: binge.startEpisode + 1,
    };
    setBinge(updatedBinge);
    setStartEpisode(() => updatedBinge.startEpisode);
  };

  const handleSubtractEndEpisode = () => {
    const updatedBinge = {
      ...binge,
      ['startEpisode']: binge.startEpisode - 1,
    };
    setBinge(updatedBinge);
    setStartEpisode(() => updatedBinge.startEpisode);
  };

  const handleShowDateChange = (value: any) => {
    const updatedBinge = { ...binge, ['dateWatched']: value.toDate() };
    setBinge(updatedBinge);
  };

  const handleBingeSave = () => {
    props.onBingeSave(binge);
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
            <SLTextField
              fullWidth
              name="showName"
              label="Name"
              defaultValue={props.show.showName}
              disabled
            />
          </Grid>
          <Grid container spacing={3} xs={12}>
            <Grid xs={6} sm={6}>
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
            <Grid xs={3}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ height: '100%' }}
                onClick={handleAddSeasonNumber}
              >
                <AddIcon />
              </Button>
            </Grid>
            <Grid xs={3}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ height: '100%' }}
                onClick={handleSubtractSeasonNumber}
              >
                <RemoveIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3} xs={12}>
            <Grid xs={6} sm={6}>
              <SLTextField
                fullWidth
                name="startEpisode"
                label="Start"
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                value={startEpisode}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={3}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ height: '100%' }}
                onClick={handleAddStartEpisode}
              >
                <AddIcon />
              </Button>
            </Grid>
            <Grid xs={3}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ height: '100%' }}
                onClick={handleSubtractStartEpisode}
              >
                <RemoveIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3} xs={12}>
            <Grid xs={6} sm={6}>
              <SLTextField
                fullWidth
                name="endEpisode"
                label="End"
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                value={endEpisode}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={3}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ height: '100%' }}
                onClick={handleAddEndEpisode}
              >
                <AddIcon />
              </Button>
            </Grid>
            <Grid xs={3}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ height: '100%' }}
                onClick={handleSubtractEndEpisode}
              >
                <RemoveIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Date Watched"
              value={dayjs(binge.dateWatched)}
              onChange={value => handleShowDateChange(value)}
            />
          </Grid>
        </Grid>
        <Fab
          sx={{
            position: 'fixed',
            bottom: placements.fab.firstIconBottom,
            right: placements.fab.right,
          }}
          color="success"
          aria-label="add"
          onClick={handleBingeSave}
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
          onClick={props.onCancelBinge}
        >
          <CancelIcon />
        </Fab>
      </Paper>
    </Box>
  );
};
