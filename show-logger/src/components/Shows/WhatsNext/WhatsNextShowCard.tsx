import { Card, CardMedia, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import EditIcon from '@mui/icons-material/Edit';
import nia_landscape from './../../../assets/nia_landscape.png';
import { SLIconButton } from '../../Common/SLIconButton';
import { WhatsNextShowModel } from '../../../models/WhatsNextShowModel';

interface WhatsNextShowCardProps {
  show: WhatsNextShowModel;
  onSelectShow: (show: WhatsNextShowModel) => void;
}

export const WhatsNextShowCard = (props: WhatsNextShowCardProps) => {
  const showName = (
    <Typography variant="body2" color="text.primary" sx={{ fontSize: 18 }}>
      <a target="_blank" href={props.show.infoUrl}>
        {props.show.showName}
      </a>
    </Typography>
  );

  const seasonName = (
    <Typography variant="body2" color="text.primary">
      <a target="_blank" href={props.show.seasonUrl}>
        <>{props.show.seasonName}</>
      </a>
    </Typography>
  );

  const today = new Date();
  const unairedEpisodes = props.show.episodes.filter(
    n => n.airDate != null && new Date(n.airDate).getTime() >= today.getTime(),
  ).length;
  console.log(props.show.showName);
  const episodesLeft = props.show.episodes.length - unairedEpisodes;

  let imageUrl = props.show.backdropUrl;

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
          height: 265,
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
              sm: 161,
            },
            p: {
              xs: 0,
              sm: 1,
            },
            mt: 0,
          }}
        >
          {showName}
          {seasonName}
          <Typography variant="body2" color="text.primary">
            {props.show.startDate && (
              <>
                {`Start Date: ${new Date(
                  props.show.startDate,
                ).toLocaleDateString()}`}
              </>
            )}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.show.endDate && (
              <>
                {`End Date: ${new Date(
                  props.show.endDate,
                ).toLocaleDateString()}`}
              </>
            )}
          </Typography>
          <Typography variant="body2" color="text.primary">
            <>{`Season Status: ${props.show.seasonStatus}`}</>
          </Typography>
          {episodesLeft > 0 && (
            <Typography variant="body2" color="text.primary">
              <>{`Episodes Left: ${episodesLeft}`}</>
            </Typography>
          )}
          {props.show.nextAirDateCount > 0 && (
            <Typography variant="body2" color="text.primary">
              <>{`Days Left: ${props.show.nextAirDateCount} - ${props.show.nextAirDateDay} - ${new Date(
                props.show.nextAirDate,
              ).toLocaleDateString()}`}</>
            </Typography>
          )}
          {unairedEpisodes > 0 && (
            <Typography variant="body2" color="text.primary">
              <>{`Unaired Episodes: ${unairedEpisodes}`}</>
            </Typography>
          )}
        </Grid>
        <Grid xs={2} sm={12}>
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'center' }}
            >
              <SLIconButton
                aria-label="Edit"
                onClick={() => {
                  props.onSelectShow(props.show);
                }}
              >
                <EditIcon style={{ color: 'cornflowerblue' }} />
              </SLIconButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};
