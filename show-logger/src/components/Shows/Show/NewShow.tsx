import { useState } from 'react';
import { CodeValueModel } from '../../../models/CodeValueModel';
import { ShowModel } from '../../../models/ShowModel';
import { TransactionItemModel } from '../../../models/TransactionItemModel';
import { Box, Button, Typography, useTheme } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { EditShow } from './EditShow';
import { ShowLookUp } from './ShowLookUp';
import { SearchResultsModel } from '../../../models/SearchResultsModel';

const steps = ['Search', 'Create'];

export interface NewShowProps {
  show: ShowModel;
  showTypeIds: CodeValueModel[];
  transactionItems: TransactionItemModel[];
  onCancelSelectedShow: () => void;
  onShowSave: (show: ShowModel, searchSkippedOrEdit: boolean) => void;
}

export const NewShow = (props: NewShowProps) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState(new Set<number>());
  const [skipped, setSkipped] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SearchResultsModel>();

  const isStepOptional = (step: number) => {
    return step === 0;
  };

  const isStepSkipped = (step: number) => {
    return skippedSteps.has(step);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkippedSteps(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });

    setSkipped(true);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleWatchResult = (
    searchResult: SearchResultsModel,
    watchList: boolean,
  ) => {
    setSelectedResult(searchResult);
    props.show.id = searchResult.id.toString();
    props.show.api = searchResult.api;
    props.show.type = searchResult.type;

    props.show.showName = searchResult.name;

    let showTypeId = 1000;

    if (searchResult.type === 1) {
      const airDate = new Date(searchResult.airDate);
      const d = new Date();

      d.setDate(d.getDate() - 45);
      showTypeId = airDate >= d ? 1002 : 1001;
    }

    props.show.showTypeId = showTypeId;

    props.show.watchlist = watchList;
    setActiveStep(1);
  };

  return (
    <>
      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 0 && <ShowLookUp onWatchResult={handleWatchResult} />}
      </Box>
      <Box
        sx={{
          maxWidth: 1200,
        }}
      >
        {activeStep === 1 && (
          <Box>
            <EditShow
              show={props.show}
              transactionItems={props.transactionItems}
              showTypeIds={props.showTypeIds}
              onShowSave={props.onShowSave}
              onCancelSelectedShow={props.onCancelSelectedShow}
              searchSkippedOrEdit={skipped}
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
              onClick={props.onCancelSelectedShow}
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
            <Button
              color="inherit"
              onClick={handleSkip}
              sx={{
                pl: 5,
                pr: 5,
                height: {
                  xs: 52,
                  sm: 42,
                },
              }}
            >
              Skip
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};
