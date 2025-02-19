import { Box, Fab, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import { placements } from '../../../config/placementConfig';
import dayjs from 'dayjs';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { SLTextField } from '../../Common/SLTextField';
import { WatchedModel } from '../../../models/WatchedModel';
import { SLDatePicker } from '../../Common/SLDatePicker';

interface EditWatchedProps {
  watched: WatchedModel;
  onCancelSelectedWatched: () => void;
  onWatchedSave: (subcription: WatchedModel) => void;
}

export const EditWatched = (props: EditWatchedProps) => {
  const [watched, setWatched] = useState<WatchedModel>(props.watched);

  const handleDateWatchedChange = (value: any) => {
    const updatedBook = {
      ...watched,
      ['dateWatched']: value != null ? value.toDate() : null,
    };
    setWatched(updatedBook);
  };

  const handleWatchedSave = () => {
    const saveData: WatchedModel = { ...watched };

    props.onWatchedSave(saveData);
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
              defaultValue={watched.name}
              enabled={false}
            />
          </Grid>
          <Grid xs={12}>
            <SLDatePicker
              label="Date Watched"
              date={watched.dateWatched}
              onDateChange={handleDateWatchedChange}
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
          onClick={handleWatchedSave}
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
          onClick={props.onCancelSelectedWatched}
        >
          <CancelIcon />
        </Fab>
      </Paper>
    </Box>
  );
};
