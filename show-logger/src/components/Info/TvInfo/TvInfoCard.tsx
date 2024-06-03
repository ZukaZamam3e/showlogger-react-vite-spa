import { TvInfoModel } from '../../../models/TvInfoModel';
import { Card, CardMedia, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SLIconButton } from '../../Common/SLIconButton';
import nia_landscape from './../../../assets/nia_landscape.png';

interface TvInfoCardProps {
  tvInfo: TvInfoModel;
  onSelectTvInfo: (tvInfo: TvInfoModel) => void;
}

export const TvInfoCard = (props: TvInfoCardProps) => {
  const totalEpisodes = props.tvInfo.seasons.reduce(
    (partialSum, a) => partialSum + a.episodeCount,
    0,
  );

  const totalSeasons = props.tvInfo.seasons.filter(
    m => m.seasonName !== 'Specials',
  ).length;

  const showName =
    props.tvInfo.infoUrl != null ? (
      <a target="_blank" href={props.tvInfo.infoUrl}>
        {props.tvInfo.showName}
      </a>
    ) : (
      <>{props.tvInfo.showName}</>
    );
  let imageUrl = props.tvInfo.backdropUrl;

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
            xs: 155,
            sm: 255,
          },
        }}
      >
        <Grid
          xs={10}
          sm={12}
          sx={{
            minHeight: {
              xs: 155,
              sm: 175,
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
            {props.tvInfo.status && <>Status: {props.tvInfo.status}</>}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Total Seasons: {totalSeasons}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Total Episodes: {totalEpisodes}
          </Typography>
          {/* <Typography variant="body2" color="text.primary">
            {props.tvStat.watched}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {`${new Date(props.tvStat.firstWatched).toLocaleDateString()} - ${new Date(props.tvStat.lastWatched).toLocaleDateString()}`}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {`${props.tvStat.episodesWatched} total - ${totalDays}`}
          </Typography>
          {hasNextEpisode && (
            <>
              <Typography variant="body2" color="text.primary">
                {nextEpisodeName}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {props.tvStat.nextWatched}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {episodesLeft}
              </Typography>
            </>
          )}
        </Grid> */}
        </Grid>
        <Grid xs={2} sm={12}>
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'center' }}
            >
              <SLIconButton
                aria-label="Open Details"
                onClick={() => {
                  props.onSelectTvInfo(props.tvInfo);
                }}
              >
                <VisibilityIcon style={{ color: 'lightblue' }} />
              </SLIconButton>
              <SLIconButton
                aria-label="Delete"
                onClick={() => {
                  //props.onDeleteBook(props.book.bookId);
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
