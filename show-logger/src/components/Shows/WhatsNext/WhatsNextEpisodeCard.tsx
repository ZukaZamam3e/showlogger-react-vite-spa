import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import nia_landscape from './../../../assets/nia_landscape.png';
import { WhatsNextEpisodeModel } from '../../../models/WhatsNextEpisodeModel';
import Grid from '@mui/material/Unstable_Grid2';
import { SLIconButton } from '../../Common/SLIconButton';
import AddIcon from '@mui/icons-material/Add';

interface WhatsNextEpisodeCardProp {
  episode: WhatsNextEpisodeModel;
  onWatchEpisode: (episode: WhatsNextEpisodeModel) => void;
}

export const WhatsNextEpisodeCard = (props: WhatsNextEpisodeCardProp) => {
  let imageUrl = props.episode.imageUrl;

  if (imageUrl == '') {
    imageUrl = nia_landscape;
  }

  const airDateRuntime = `${
    props.episode.airDate
      ? new Date(props.episode.airDate).toLocaleDateString()
      : 'No Air Date'
  } • ${props.episode.runtime != null ? `${props.episode.runtime}m` : 'No Runtime'}`;

  const sxContent = {
    textAlign: 'left',
  };

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
          xs={6}
          sm={12}
          sx={{
            minHeight: {
              sm: 161,
            },
            p: {
              xs: 0,
              sm: 1,
            },
            mt: 0,
          }}
        >
          <CardContent sx={sxContent}>
            <Typography variant="h6" color="text.primary">
              {props.episode.episodeNumber} - {props.episode.episodeName}
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontSize: 16, pb: 3 }}
            >
              {airDateRuntime}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.episode.episodeOverview}
            </Typography>
          </CardContent>
        </Grid>
        <Grid xs={6} sm={12}>
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'center' }}
            >
              <SLIconButton
                aria-label="Watch"
                onClick={() => {
                  props.onWatchEpisode(props.episode);
                }}
              >
                <AddIcon style={{ color: 'lightgreen' }} />
              </SLIconButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};
