import { TvStatModel } from '../../models/TvStatModel';
import { Card, CardMedia, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AddIcon from '@mui/icons-material/Add';

export interface TvStatCardProps {
  tvStat: TvStatModel;
  onAddNextEpisode: (showId: number) => void;
}

export const TvStatCard = (props: TvStatCardProps) => {
  const hasNextEpisode = props.tvStat.infoId !== null;
  const hasEpisodesLeft = props.tvStat.episodesLeft ?? 0 > 0;
  const totalDays = `${props.tvStat.daysSinceStarting} day${(props.tvStat.daysSinceStarting ?? 0) > 1 ? 's' : ''}`;
  const episodesLeft = (
    <>
      {hasEpisodesLeft && (
        <>{`${props.tvStat.episodesLeft} episode${(props.tvStat.episodesLeft ?? 0) > 1 ? 's' : ''} left`}</>
      )}
    </>
  );
  const nextEpisodeName = (
    <a target="_blank" href={props.tvStat.nextInfoUrl}>
      {props.tvStat.nextEpisodeName}
    </a>
  );
  const showName =
    props.tvStat.infoId != null ? (
      <a target="_blank" href={props.tvStat.infoUrl}>
        {props.tvStat.showName}
      </a>
    ) : (
      <>{props.tvStat.showName}</>
    );
  const imageUrl = props.tvStat.infoBackdropUrl;
  const sxButton = { border: 1, borderRadius: '25%' };

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
            {showName}
          </Typography>
          <Typography variant="body2" color="text.primary">
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
        </Grid>
        <Grid xs={2} sm={12}>
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'center' }}
            >
              <IconButton
                aria-label="Add Next Episode"
                sx={sxButton}
                onClick={() => {
                  props.onAddNextEpisode(props.tvStat.showId);
                }}
              >
                <AddIcon style={{ color: 'lightgreen' }} />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};
