import { ShowModel, formatter } from '../../models/ShowModel';
import { Card, CardMedia, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import nia_landscape from './../../assets/nia_landscape.png';
import { SLIconButton } from './SLIconButton';

interface AmcCardProps {
  show: ShowModel;
  name?: string;
  isMobile: boolean;
  hasButtons?: boolean;
  onSelectShow: (show: ShowModel) => void;
  onDeleteShow: (showId: number) => void;
}

export const AmcCard = (props: AmcCardProps) => {
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

  const totalPurchases = props.show.totalPurchases ?? 0;

  const name =
    props.name != null ? (
      <Typography variant="body2" color="text.primary">
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
          <Typography variant="body2" color="text.r">
            {formatter.format(totalPurchases)}
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
