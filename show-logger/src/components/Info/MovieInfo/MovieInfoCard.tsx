import { MovieInfoModel } from '../../../models/MovieInfoModel';
import { Card, CardMedia, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SLIconButton } from '../../Common/SLIconButton';
import nia_landscape from './../../../assets/nia_landscape.png';

interface MovieInfoCardProps {
  movieInfo: MovieInfoModel;
  onDeleteMovieInfo: (movieInfoId: number) => void;
}

export const MovieInfoCard = (props: MovieInfoCardProps) => {
  const movieName =
    props.movieInfo.infoUrl != null ? (
      <a target="_blank" href={props.movieInfo.infoUrl}>
        {props.movieInfo.movieName}
      </a>
    ) : (
      <>{props.movieInfo.movieName}</>
    );

  const airDateRuntime = `${
    props.movieInfo.airDate
      ? new Date(props.movieInfo.airDate).toLocaleDateString()
      : 'No Air Date'
  } • ${props.movieInfo.runtime != null ? `${props.movieInfo.runtime}m` : 'No Runtime'}`;
  let imageUrl = props.movieInfo.backdropUrl;

  if (imageUrl == '') {
    imageUrl = nia_landscape;
  }

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
            xs: 115,
            sm: 155,
          },
        }}
      >
        <Grid
          xs={8}
          sm={12}
          sx={{
            minHeight: {
              xs: 15,
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
            {movieName}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontSize: 16, pb: 3 }}
          >
            {airDateRuntime}
          </Typography>
          {/* <Typography variant="body2" color="text.primary">
            {props.movieInfo.movieOverview}
          </Typography> */}
        </Grid>
        <Grid xs={4} sm={12}>
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'center' }}
            >
              <SLIconButton
                aria-label="Delete"
                onClick={() => {
                  props.onDeleteMovieInfo(props.movieInfo.movieInfoId);
                }}
              >
                <DeleteIcon style={{ color: 'red' }} />
              </SLIconButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};
