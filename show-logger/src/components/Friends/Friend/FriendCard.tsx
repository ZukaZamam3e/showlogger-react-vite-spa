import { FriendModel } from '../../../models/FriendModel';
import { Card, CardMedia, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { SLIconButton } from '../../Common/SLIconButton';

interface FriendCardProps {
  friend: FriendModel;
  onAcceptFriendRequest: (friendRequestId: number) => void;
  onDenyFriendRequest: (friendRequestId: number) => void;
  onDeleteFriend: (friendId: number) => void;
}

export const FriendCard = (props: FriendCardProps) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          p: 1,
        }}
      >
        <Grid
          xs={6}
          sm={12}
          sx={{
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
            {props.friend.friendName}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.friend.friendEmail}
          </Typography>
        </Grid>
        <Grid xs={6} sm={12}>
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'center' }}
            >
              {props.friend.isPending ? (
                <>
                  <SLIconButton
                    aria-label="Accept"
                    onClick={() => {
                      props.onAcceptFriendRequest(props.friend.id);
                    }}
                  >
                    <CheckIcon style={{ color: 'green' }} />
                  </SLIconButton>
                  <SLIconButton
                    aria-label="Deny"
                    onClick={() => {
                      props.onDenyFriendRequest(props.friend.id);
                    }}
                  >
                    <ClearIcon style={{ color: 'red' }} />
                  </SLIconButton>
                </>
              ) : (
                <SLIconButton
                  aria-label="Delete"
                  onClick={() => {
                    props.onDeleteFriend(props.friend.id);
                  }}
                >
                  <DeleteIcon style={{ color: 'red' }} />
                </SLIconButton>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};
