import { WhatsNextSubModel } from '../../../models/WhatsNextSubModel';
import { Card, CardMedia, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import nia_landscape from './../../../assets/nia_landscape.png';
import { SLIconButton } from '../../Common/SLIconButton';

interface SubscriptionCardProps {
  subscription: WhatsNextSubModel;
  onSelectSubscription: (subscription: WhatsNextSubModel) => void;
  onDeleteSubscription: (subscriptionId: number) => void;
}

export const SubscriptionCard = (props: SubscriptionCardProps) => {
  const hasInfoUrl = !!props.subscription.infoUrl;

  const showName = hasInfoUrl && (
    <Typography variant="body2" color="text.primary">
      <a target="_blank" href={props.subscription.infoUrl}>
        {props.subscription.showName}
      </a>
    </Typography>
  );

  let imageUrl = props.subscription.backdropUrl;

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
          {showName}
          <Typography variant="body2" color="text.primary">
            {props.subscription.subscribeDate && (
              <>
                {`Subscribe Date: ${new Date(
                  props.subscription.subscribeDate,
                ).toLocaleDateString()}`}
              </>
            )}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.subscription.status}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.subscription.includeSpecials
              ? 'Specials included'
              : 'Specials Not Included'}
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
                  props.onSelectSubscription(props.subscription);
                }}
              >
                <EditIcon style={{ color: 'cornflowerblue' }} />
              </SLIconButton>
              <SLIconButton
                aria-label="Delete"
                onClick={() => {
                  props.onDeleteSubscription(props.subscription.whatsNextSubId);
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
