import { BookYearStatDataModel } from '../../../models/BookYearStatDataModel';
import { Card, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

interface YearStatDataCardProps {
  yearStatData: BookYearStatDataModel;
}

export const BookYearStatDataCard = (props: YearStatDataCardProps) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          p: 1,
        }}
      >
        <Grid
          xs={12}
          sx={{
            minHeight: {
              xs: 85,
              sm: 100,
            },
            p: 1,
            mt: {
              xs: 0,
              sm: 0,
            },
          }}
        >
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontSize: 18 }}
          >
            {props.yearStatData.bookName}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.yearStatData.startDate && (
              <>
                Start Date:{' '}
                {new Date(props.yearStatData.startDate).toLocaleDateString()}
              </>
            )}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.yearStatData.startDate && (
              <>
                End Date:{' '}
                {new Date(props.yearStatData.endDate).toLocaleDateString()}
              </>
            )}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.yearStatData.chapters && (
              <>Chapters: {props.yearStatData.chapters}</>
            )}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.yearStatData.pages && <>Pages: {props.yearStatData.pages}</>}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
