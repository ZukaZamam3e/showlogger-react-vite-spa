import { YearStatModel } from '../../models/YearStatModel';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { formatter } from '../../models/ShowModel';

interface YearStatCardProps {
  yearStat: YearStatModel;
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
      <CardHeader
        title={props.yearStat.year}
        subheader={props.yearStat.name}
        subheaderTypographyProps={{ color: 'text.primary' }}
        sx={{ pb: 0 }}
      />
      <CardContent
        sx={{
          minHeight: {
            xs: 0,
            sm: 155,
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
    </Card>
  );
};
