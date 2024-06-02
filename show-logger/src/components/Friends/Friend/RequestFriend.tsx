import { Box, Fab, Paper } from '@mui/material';
import { placements } from '../../../config/placementConfig';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SLTextField } from '../../Common/SLTextField';

interface RequestFriendProps {
  onSendFriendRequest: (email: string) => void;
  onCancelFriendRequest: () => void;
}

export const RequestFriend = (props: RequestFriendProps) => {
  const [email, setEmail] = useState('');
  return (
    <>
      <Box
        sx={{
          paddingBottom: {
            xs: '185px',
            sm: '185px',
            md: '52px',
            lg: '52px',
          },
        }}
      >
        <Paper
          sx={{
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: 'white',
            borderRadius: 3,
            m: 2,
            padding: 3,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid xs={12}>
              <SLTextField
                fullWidth
                name="email"
                label="Email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Fab
        sx={{
          position: 'fixed',
          bottom: placements.fab.firstIconBottom,
          right: placements.fab.right,
        }}
        color="success"
        aria-label="add"
        onClick={() => props.onSendFriendRequest(email)}
      >
        <SaveIcon />
      </Fab>
      <Fab
        sx={{
          position: 'fixed',
          bottom: placements.fab.secondIconBottom,
          right: placements.fab.right,
        }}
        color="error"
        aria-label="add"
        onClick={props.onCancelFriendRequest}
      >
        <CancelIcon />
      </Fab>
    </>
  );
};
