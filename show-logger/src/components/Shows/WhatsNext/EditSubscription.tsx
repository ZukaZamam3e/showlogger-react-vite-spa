import {
  Box,
  Fab,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import { placements } from '../../../config/placementConfig';
import dayjs from 'dayjs';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { SLTextField } from '../../Common/SLTextField';
import { WhatsNextSubModel } from '../../../models/WhatsNextSubModel';

interface EditSubscriptionProps {
  subscription: WhatsNextSubModel;
  onCancelSelectedSubscription: () => void;
  onSubscriptionSave: (subcription: WhatsNextSubModel) => void;
}

export const EditSubscription = (props: EditSubscriptionProps) => {
  const [subscription, setSubscription] = useState<WhatsNextSubModel>(
    props.subscription,
  );

  const includeSpecials = subscription.includeSpecials ? 1 : 0;

  const handleChange = (e: any) => {
    const updatedSubscription = () => {
      if (e.target.name === 'chapters' || e.target.name === 'pages') {
        let value = parseInt(e.target.value);

        return { ...subscription, [e.target.name]: value };
      } else {
        return { ...subscription, [e.target.name]: e.target.value };
      }
    };

    setSubscription(updatedSubscription());
  };

  const handleSubscribeDateChange = (value: any) => {
    const updatedBook = {
      ...subscription,
      ['subscribeDate']: value != null ? value.toDate() : null,
    };
    setSubscription(updatedBook);
  };

  const handleIncludeSpecialsChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: number,
  ) => {
    const bNewValue = newValue == 1;
    const updatedSub = {
      ...subscription,
      ['includeSpecials']: bNewValue,
    };

    console.log(updatedSub);
    setSubscription(updatedSub);
  };

  const handleSubscriptionkSave = () => {
    const saveData: WhatsNextSubModel = { ...subscription };

    props.onSubscriptionSave(saveData);
  };

  return (
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
              name="showName"
              label="Name"
              defaultValue={subscription.showName}
              enabled={false}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true, required: false } }}
              label="Subscribe Date"
              defaultValue={
                props.subscription.subscribeDate &&
                dayjs(props.subscription.subscribeDate)
              }
              onChange={value => handleSubscribeDateChange(value)}
            />
          </Grid>
          <Grid xs={12}>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={includeSpecials}
              onChange={handleIncludeSpecialsChange}
              fullWidth
            >
              <ToggleButton value={0}>Don't Include Specials</ToggleButton>
              <ToggleButton value={1}>Include Specials</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Fab
          sx={{
            position: 'fixed',
            bottom: placements.fab.firstIconBottom,
            right: placements.fab.right,
          }}
          color="success"
          aria-label="add"
          onClick={handleSubscriptionkSave}
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
          onClick={props.onCancelSelectedSubscription}
        >
          <CancelIcon />
        </Fab>
      </Paper>
    </Box>
  );
};
