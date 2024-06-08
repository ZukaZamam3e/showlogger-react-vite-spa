import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { TvEpisodeInfoModel } from '../../../models/TvEpisodeInfoModel';
import nia_landscape from './../../../assets/nia_landscape.png';

interface TvInfoSeasonCardProp {
  episode: TvEpisodeInfoModel;
}

export const TvInfoSeasonCard = (props: TvInfoSeasonCardProp) => {
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
    </Card>
  );
};
