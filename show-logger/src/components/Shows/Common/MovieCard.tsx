import { ShowModel } from '../../../models/ShowModel';
import { Card, CardMedia, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import nia_landscape from './../../../assets/nia_landscape.png';
import { SLIconButton } from '../../Common/SLIconButton';

interface MovieCardProps {
  show: ShowModel;
  name?: string;
  hasButtons?: boolean;
  onSelectShow: (show: ShowModel) => void;
  onDeleteShow: (showId: number) => void;
}

export const MovieCard = (props: MovieCardProps) => {
  let hasButtons = true;
  if (props.hasButtons != null) {
    hasButtons = props.hasButtons;
  }

  const runtime = <>{props.show.runtime && <>{props.show.runtimeZ}</>}</>;

  const hasInfoUrl = !!props.show.infoUrl;

  const showName = hasInfoUrl ? (
    <a target="_blank" href={props.show.infoUrl}>
      {props.show.showName}
    </a>
  ) : (
    <>{props.show.showName}</>
  );

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
  const notesFontSize =
    props.show.showNotes && props.show.showNotes.length > 38 ? 10 : 14;
  let imageUrl = props.show.imageUrl;

  if (imageUrl == '') {
    imageUrl = nia_landscape;
  }

  let topCardDisplay = {
    xs: 'none',
    sm: 'block',
  };

  let mobileCardDisplay = {
    xs: 'block',
    sm: 'none',
  };

  if (props.name != null) {
    topCardDisplay = {
      xs: 'block',
      sm: 'block',
    };

    mobileCardDisplay = {
      xs: 'none',
      sm: 'none',
    };
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
          display: topCardDisplay,
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
          <CardMedia
            component="img"
            image={imageUrl}
            sx={{
              display: mobileCardDisplay,
              height: 95,
              width: 175,
              m: 'auto',
            }}
          />
          {name}
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontSize: titleFontSize }}
          >
            {showName}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.show.showTypeIdZ}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.show.dateWatched &&
              new Date(props.show.dateWatched).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {runtime}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontSize: notesFontSize }}
          >
            {props.show.showNotes}
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
                  aria-label="Delete"
                  onClick={() => {
                    props.onDeleteShow(props.show.showId);
                  }}
                >
                  <DeleteIcon style={{ color: 'red' }} />
                </SLIconButton>
              </Stack>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};
