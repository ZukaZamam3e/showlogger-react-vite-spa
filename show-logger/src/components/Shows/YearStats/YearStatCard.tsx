import { YearStatModel } from '../../../models/YearStatModel';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import Slider from 'react-slick';
import { formatter } from '../../../models/ShowModel';
import nia_landscape from './../../../assets/nia_landscape.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface YearStatCardProps {
  yearStat: YearStatModel;
  onSelect: (yearStat: YearStatModel) => void;
}

export const YearStatCard = (props: YearStatCardProps) => {
  const missingTvCnt =
    props.yearStat.tvNotTrackedCnt > 0 ? (
      <> ({props.yearStat.tvNotTrackedCnt})</>
    ) : (
      <></>
    );

  const tvTime =
    props.yearStat.tvRuntime !== null ? (
      <Typography variant="body2" color="text.primary">
        {props.yearStat.tvRuntimeZ}
      </Typography>
    ) : (
      <></>
    );

  const missingMovieCnt =
    props.yearStat.moviesNotTrackedCnt > 0 ? (
      <> ({props.yearStat.moviesNotTrackedCnt})</>
    ) : (
      <></>
    );

  const movieTime =
    props.yearStat.moviesRuntime !== null ? (
      <Typography variant="body2" color="text.primary">
        {props.yearStat.moviesRuntimeZ}
      </Typography>
    ) : (
      <></>
    );

  const missingAmcCnt =
    props.yearStat.amcNotTrackedCnt > 0 ? (
      <> ({props.yearStat.amcNotTrackedCnt})</>
    ) : (
      <></>
    );

  const amcTime =
    props.yearStat.amcRuntime !== null ? (
      <Typography variant="body2" color="text.primary">
        {props.yearStat.amcRuntimeZ}
      </Typography>
    ) : (
      <></>
    );

  const totalSpent =
    props.yearStat.aListMembership > 0 ||
    props.yearStat.aListTickets > 0 ||
    props.yearStat.amcPurchases > 0 ? (
      <>
        <Typography variant="body2" color="text.primary">
          A-List Membership: {formatter.format(props.yearStat.aListMembership)}
        </Typography>
        <Typography variant="body2" color="text.primary">
          A-List Tickets: {formatter.format(props.yearStat.aListTickets)}
        </Typography>
        <Typography variant="body2" color="text.primary">
          AMC Purchases: {formatter.format(props.yearStat.amcPurchases)}
        </Typography>
      </>
    ) : (
      <></>
    );

  const backdrops: any = props.yearStat.data.map(d => {
    if (d.infoBackdropUrl == '' || d.infoBackdropUrl == null) {
      d.infoBackdropUrl = nia_landscape;
    }

    return d;
  });

  const sliderSettings = {
    arrows: true,
    infinite: backdrops.length > 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: {
          xs: 0,
          sm: 280,
        },
      }}
    >
      <div style={{ maxHeight: 315 }}>
        <Slider {...sliderSettings}>
          {backdrops.map((b: any) => (
            <>
              <strong
                style={{
                  height: 24,
                  maxHeight: 24,
                  fontSize: b.showName.length > 33 ? 10 : 16,
                }}
              >
                {b.showName}
              </strong>
              <CardMedia
                key={b}
                component="img"
                image={b.infoBackdropUrl}
                sx={{
                  height: {
                    xs: 205,
                    sm: 265,
                  },
                  maxHeight: {
                    xs: 205,
                    sm: 265,
                  },
                }}
              />
              <div
                style={{
                  height: 24,
                  maxHeight: 24,
                  fontSize: 14,
                }}
              >
                {b.totalRuntimeZ}
                {b.totalRuntimeZ != '' && b.showTypeId == 1000 && <> - </>}
                {b.showTypeId == 1000 && <>{b.watchCount} episodes</>}
              </div>
            </>
          ))}
        </Slider>
      </div>
      <CardHeader
        title={props.yearStat.name}
        subheader={props.yearStat.year}
        subheaderTypographyProps={{ color: 'text.primary' }}
        sx={{ pb: 0 }}
      />
      <CardContent
        sx={{
          minHeight: {
            xs: 0,
            sm: 205,
          },
          pt: 1,
        }}
      >
        <Typography variant="body2" color="text.primary">
          TV: {props.yearStat.tvCnt}
          {missingTvCnt}
        </Typography>
        {tvTime}
        <Typography variant="body2" color="text.primary">
          Movie: {props.yearStat.moviesCnt}
          {missingMovieCnt}
        </Typography>
        {movieTime}
        <Typography variant="body2" color="text.primary">
          AMC: {props.yearStat.amcCnt}
          {missingAmcCnt}
        </Typography>
        {amcTime}
        {totalSpent}
      </CardContent>
      <Stack direction="column" spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => {
              props.onSelect(props.yearStat);
            }}
          >
            See More
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};
