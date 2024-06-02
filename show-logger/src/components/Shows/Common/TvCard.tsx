import { ShowModel } from '../../../models/ShowModel';
import { Card, CardMedia, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForewardIcon from '@mui/icons-material/FastForward';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import nia_landscape from './../../../assets/nia_landscape.png';
import { SLIconButton } from '../../Common/SLIconButton';

interface TvCardProps {
  show: ShowModel;
  name?: string;
  hasButtons?: boolean;
  onSelectShow: (show: ShowModel) => void;
  onAddNextEpisode: (showId: number) => void;
  onDeleteShow: (showId: number) => void;
  onAddOneDay: (showId: number) => void;
  onSubtractOneDay: (showId: number) => void;
  onBingeWatchShow: (show: ShowModel) => void;
}

export const TvCard = (props: TvCardProps) => {
  let hasButtons = true;
  if (props.hasButtons != null) {
    hasButtons = props.hasButtons;
  }

  const hasInfoUrl = !!props.show.infoUrl;

  const episodeName = hasInfoUrl && (
    <Typography variant="body2" color="text.primary">
      <a target="_blank" href={props.show.infoUrl}>
        {props.show.episodeName}
      </a>
    </Typography>
  );

  const runtime = <>{props.show.runtime && <>{props.show.runtimeZ}</>}</>;

  const name =
    props.name != null ? (
      <Typography variant="body2" color="text.primary" sx={{ fontSize: 20 }}>
        {props.name}
      </Typography>
    ) : (
      <></>
    );

  const hasName = props.name != null;
  const titleFontSize = hasName ? 14 : 18;
  const gridXs = hasButtons ? 6 : 12;

  let imageUrl = props.show.imageUrl;

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
          xs={gridXs}
          sm={12}
          sx={{
            minHeight: {
              xs: 155,
              sm: 161,
            },
            p: 1,
            mt: {
              xs: 0,
              sm: 0,
            },
          }}
        >
          {name}
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontSize: titleFontSize }}
          >
            {props.show.showName}
          </Typography>
          {episodeName}
          <Typography variant="body2" color="text.primary">
            {props.show.showTypeIdZ} - {props.show.seasonEpisode}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.show.dateWatched &&
              new Date(props.show.dateWatched).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {runtime}
          </Typography>
        </Grid>
        {hasButtons && (
          <Grid xs={6} sm={12}>
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
                <SLIconButton
                  aria-label="Add Next Episode"
                  onClick={() => {
                    props.onAddNextEpisode(props.show.showId);
                  }}
                >
                  <AddIcon style={{ color: 'lightgreen' }} />
                </SLIconButton>
                <SLIconButton
                  aria-label="Delete"
                  onClick={() => {
                    props.onDeleteShow(props.show.showId);
                  }}
                >
                  <DeleteIcon style={{ color: 'red' }} />
                </SLIconButton>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: 'center' }}
              >
                <SLIconButton
                  aria-label="Subtract One Day"
                  onClick={() => {
                    props.onSubtractOneDay(props.show.showId);
                  }}
                >
                  <FastRewindIcon style={{ color: 'yellow' }} />
                </SLIconButton>
                <SLIconButton
                  aria-label="Add One Day"
                  onClick={() => {
                    props.onAddOneDay(props.show.showId);
                  }}
                >
                  <FastForewardIcon style={{ color: 'cyan' }} />
                </SLIconButton>
                <SLIconButton
                  aria-label="Binge"
                  onClick={() => {
                    props.onBingeWatchShow(props.show);
                  }}
                >
                  <TrackChangesIcon style={{ color: 'orange' }} />
                </SLIconButton>
              </Stack>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};
