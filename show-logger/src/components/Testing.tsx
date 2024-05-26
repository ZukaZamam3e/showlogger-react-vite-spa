import { Box, Paper, TextField, Tabs, Tab, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export const Testing = () => {
  return (
    <>
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
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent={'center'}
        >
          <Grid xs={12}>
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent={'center'}
            >
              <Grid xs={6}>
                <SLTextField
                  name="showName"
                  label="Name"
                  defaultValue={'Test'}
                  fullWidth
                />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
              <Grid xs={6}>
                <SLTextField name="showName" label="Name" defaultValue={'Test'} />
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12}>
            <SLTextField name="showName" label="Name" defaultValue={'Test'} />
          </Grid>
          <Grid xs={12}>
            <SLTextField name="showName" label="Name" defaultValue={'Test'} />
          </Grid>
          <Grid xs={12}>
            <SLTextField name="showName" label="Name" defaultValue={'Test'} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
