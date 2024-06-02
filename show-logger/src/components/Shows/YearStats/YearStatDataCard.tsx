import { YearStatDataModel } from '../../models/YearStatDataModel';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import nia_landscape from './../../../assets/nia_landscape.png';
import Grid from '@mui/material/Unstable_Grid2';

interface YearStatDataCardProps {
  yearStatData: YearStatDataModel;
}

export const YearStatDataCard = (props: YearStatDataCardProps) => {
  let imageUrl = props.yearStatData.infoBackdropUrl;

  if (imageUrl == '') {
    imageUrl = nia_landscape;
  }
  const hasInfoUrl = !!props.yearStatData.infoUrl;

  const showName = hasInfoUrl ? (
    <a target="_blank" href={props.yearStatData.infoUrl}>
      {props.yearStatData.showName}
    </a>
  ) : (
    <>{props.yearStatData.showName}</>
  );

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        sx={{
          height: {
            xs: 205,
            sm: 265,
          },
        }}
      />
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
            {showName}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.yearStatData.totalRuntimeZ}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.yearStatData.showTypeId == 1000 && (
              <>{props.yearStatData.watchCount} episodes</>
            )}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
