import { useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { SearchResultsModel } from '../../../models/SearchResultsModel';
import { WhatsNextSubModel } from '../../../models/WhatsNextSubModel';
import { WatchedLookUp } from './WatchedLookUp';
import { EditWatched } from './EditWatched';
import { WatchedModel } from '../../../models/WatchedModel';
import { NewWatchedProps } from './NewWatched';
import { BatchWatchedLookUp } from './BatchWatchedLookup';

const steps = ['Search', 'Create'];

export interface NewBatchWatchedProps {
  watched: WatchedModel;
  onCancelCreatingWatched: () => void;
  onCreateWatched: (createdWatched: WatchedModel) => void;
}

export const NewBatchWatch = (props: NewBatchWatchedProps) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedShows, setSelectedShows] = useState<SearchResultsModel[]>([]);

  const handleSelectShow = (searchResult: SearchResultsModel) => {
    setSelectedShows([...selectedShows, searchResult]);
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
        {activeStep === 0 && (
          <BatchWatchedLookUp onSelectShow={handleSelectShow} />
        )}
      </Box>
      <Box
        sx={{
          maxWidth: 1200,
        }}
      >
        {activeStep === 1 && (
          <Box>
            <EditWatched
              watched={props.watched}
              onWatchedSave={props.onCreateWatched}
              onCancelSelectedWatched={props.onCancelCreatingWatched}
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
              onClick={props.onCancelCreatingWatched}
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
