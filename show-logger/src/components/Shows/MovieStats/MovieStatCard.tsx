import { Card, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { MovieStatModel } from '../../../models/MovieStatModel';
import { formatter } from '../../../models/ShowModel';

export interface MovieStatCardProps {
  movieStat: MovieStatModel;
}

export const MovieStatCard = (props: MovieStatCardProps) => {
  const isAMC = props.movieStat.showTypeId === 1002;
  const movieName =
    props.movieStat.infoId != null ? (
      <a target="_blank" href={props.movieStat.infoUrl}>
        {props.movieStat.movieName}
      </a>
    ) : (
      <>{props.movieStat.movieName}</>
    );

  const imageUrl = props.movieStat.infoBackdropUrl;

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
          minHeight: {
            xs: 155,
            sm: 255,
          },
        }}
      >
        <Grid
          xs={12}
          sx={{
            minHeight: 128,
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
            {movieName}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.movieStat.showTypeIdZ}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {new Date(props.movieStat.dateWatched).toLocaleDateString()}
          </Typography>
          {isAMC && (
            <>
              <Typography variant="body2" color="text.primary">
                A-List: {formatter.format(props.movieStat.alistTicketAmt)}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Ticket: {formatter.format(props.movieStat.ticketAmt)}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Purchases: {formatter.format(props.movieStat.purchaseAmt)}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};
