import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { WatchedModel } from '../../../models/WatchedModel';
import { SLIconButton } from '../../Common/SLIconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface WatchedCardProps {
  watched: WatchedModel;
  onSelect: (watched: WatchedModel) => void;
  onDelete: (watchedId: number) => void;
}

export const WatchedCard = (props: WatchedCardProps) => {
  const canEdit = props.watched.watchedId > 0;

  const hasInfoUrl = !!props.watched.infoUrl;

  const showName = hasInfoUrl ? (
    <a target="_blank" href={props.watched.infoUrl}>
      {props.watched.name}
    </a>
  ) : (
    <>{props.watched.name}</>
  );

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 280,
      }}
    >
      <CardMedia
        component="img"
        image={props.watched.backdropUrl}
        sx={{
          height: {
            xs: 205,
            sm: 265,
          },
        }}
      />
      <CardContent
        sx={{
          minHeight: 50,
          pt: 1,
        }}
      >
        <Typography variant="body2" color="text.primary" sx={{ fontSize: 18 }}>
          {showName}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {props.watched.dateWatched && (
            <>
              {`Date Watched: ${new Date(
                props.watched.dateWatched,
              ).toLocaleDateString()}`}
            </>
          )}
        </Typography>
      </CardContent>
      {canEdit && (
        <Stack direction="column" spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
            <SLIconButton
              aria-label="Edit"
              onClick={() => {
                props.onSelect(props.watched);
              }}
            >
              <EditIcon style={{ color: 'cornflowerblue' }} />
            </SLIconButton>
            <SLIconButton
              aria-label="Delete"
              onClick={() => {
                props.onDelete(props.watched.watchedId);
              }}
            >
              <DeleteIcon style={{ color: 'red' }} />
            </SLIconButton>
          </Stack>
        </Stack>
      )}
    </Card>
  );
};
