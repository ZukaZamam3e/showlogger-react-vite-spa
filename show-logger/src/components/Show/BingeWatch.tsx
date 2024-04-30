import { Box, Paper, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ShowModel } from '../../models/ShowModel';

export interface BingeWatchProps {
  show: ShowModel;
}

export const BingeWatch = (props: BingeWatchProps) => {
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
          maxWidth: 900,
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
              defaultValue={props.show.showName}
              disabled
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
