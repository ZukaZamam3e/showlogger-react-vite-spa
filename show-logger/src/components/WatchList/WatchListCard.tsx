import { WatchListModel } from '../../models/WatchListModel';
import { Card, CardMedia, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import nia_landscape from './../../assets/nia_landscape.png';
import { SLIconButton } from '../Common/SLIconButton';

interface WatchListCardProps {
  watchlist: WatchListModel;
  onSelectWatchList: (watchlist: WatchListModel) => void;
  onMoveToShows: (watchlistId: number) => void;
  onDeleteWatchList: (watchlistId: number) => void;
}

export const WatchListCard = (props: WatchListCardProps) => {
  const isTV = props.watchlist.showTypeId === 1000;

  const hasInfoUrl = !!props.watchlist.infoUrl;

  const episodeName = (
    <a target="_blank" href={props.watchlist.infoUrl}>
      {props.watchlist.episodeName}
    </a>
  );
  const showTypeAndNumber = (
    <>
      {props.watchlist.showTypeIdZ}{' '}
      {isTV && <> - {props.watchlist.seasonEpisode}</>}
    </>
  );
  const runtime = (
    <>{props.watchlist.runtime && <>{props.watchlist.runtimeZ}</>}</>
  );

  const showName = isTV ? (
    <>{props.watchlist.showName}</>
  ) : hasInfoUrl ? (
    <a target="_blank" href={props.watchlist.infoUrl}>
      {props.watchlist.showName}
    </a>
  ) : (
    <>{props.watchlist.showName}</>
  );

  let imageUrl = props.watchlist.imageUrl;

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
          xs={6}
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
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontSize: 18 }}
          >
            {showName}
          </Typography>
          {hasInfoUrl && (
            <Typography variant="body2" color="text.primary">
              {episodeName}
            </Typography>
          )}
          <Typography variant="body2" color="text.primary">
            {showTypeAndNumber}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.watchlist.dateAdded &&
              new Date(props.watchlist.dateAdded).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {runtime}
          </Typography>
        </Grid>
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
                  props.onSelectWatchList(props.watchlist);
                }}
              >
                <EditIcon style={{ color: 'cornflowerblue' }} />
              </SLIconButton>
              <SLIconButton
                aria-label="Move to Shows"
                onClick={() => {
                  props.onMoveToShows(props.watchlist.watchlistId);
                }}
              >
                <AddIcon style={{ color: 'lightgreen' }} />
              </SLIconButton>
              <SLIconButton
                aria-label="Delete"
                onClick={() => {
                  props.onDeleteWatchList(props.watchlist.watchlistId);
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
