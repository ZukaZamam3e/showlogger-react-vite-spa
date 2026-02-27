import { YearStatDataModel } from '../../../models/YearStatDataModel';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { List } from '../../Common/List';

interface YearStatSummaryCardProps {
  title: string;
  yearStatData: YearStatDataModel[];
}

export const YearStatSummaryCard = (props: YearStatSummaryCardProps) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: 'flex',
        width: '500px',
        flexDirection: 'column',
      }}
    >
      <CardHeader title={props.title} />
      <ImageList cols={8} rowHeight={86}>
        {props.yearStatData
          .sort((a, b) => b.watchCount - a.watchCount)
          .map(yearStat => (
            <ImageListItem key={yearStat.infoBackdropUrl}>
              <img
                style={{ overflowClipMargin: 'unset', height: 43 }}
                srcSet={yearStat.posterUrl}
                src={yearStat.posterUrl}
                alt={yearStat.showName}
              />
            </ImageListItem>
          ))}
      </ImageList>
      {/* <CardMedia
          component="img"
          image={imageUrl}
          sx={{
            height: {
              xs: 205,
              sm: 265,
            },
          }}
        /> */}
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
        ></Grid>
      </Grid>
    </Card>
  );
};
