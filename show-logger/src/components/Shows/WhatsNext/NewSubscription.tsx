import { useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { SearchResultsModel } from '../../../models/SearchResultsModel';
import { WhatsNextSubModel } from '../../../models/WhatsNextSubModel';
import { SubLookUp } from './SubLookUp';
import { EditSubscription } from './EditSubscription';

const steps = ['Search', 'Create'];

export interface NewSubscriptionProps {
  subscription: WhatsNextSubModel;
  onCancelCreatingSubscription: () => void;
  onCreateSubscription: (subscription: WhatsNextSubModel) => void;
}

export const NewSubscription = (props: NewSubscriptionProps) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleSelectShow = (searchResult: SearchResultsModel) => {
    props.subscription.id = searchResult.id.toString();
    props.subscription.api = searchResult.api;
    props.subscription.type = searchResult.type;
    props.subscription.showName = searchResult.name;

    setActiveStep(1);
  };

  return (
    <>
      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map(label => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 0 && <SubLookUp onSelectShow={handleSelectShow} />}
      </Box>
      <Box
        sx={{
          maxWidth: 1200,
        }}
      >
        {activeStep === 1 && (
          <Box>
            <EditSubscription
              subscription={props.subscription}
              onSubscriptionSave={props.onCreateSubscription}
              onCancelSelectedSubscription={props.onCancelCreatingSubscription}
            />
          </Box>
        )}
        {activeStep === 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              position: 'fixed',
              bottom: 0,
              right: 0,
              left: 0,
              height: {
                xs: 52,
                sm: 42,
              },
              pb: '15px',
              //paddingTop: 7,
              backgroundColor: theme.palette.secondary.dark,
            }}
          >
            <Button
              color="inherit"
              onClick={props.onCancelCreatingSubscription}
              sx={{
                pl: 5,
                pr: 5,
                height: {
                  xs: 52,
                  sm: 42,
                },
              }}
            >
              Cancel
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
          </Box>
        )}
      </Box>
    </>
  );
};
