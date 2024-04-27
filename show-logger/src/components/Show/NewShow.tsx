import { useState } from "react";
import { CodeValueModel } from "../../models/CodeValueModel";
import { ShowModel } from "../../models/ShowModel";
import { TransactionItemModel } from "../../models/TransactionItemModel";
import { Backdrop, Box, Button, CircularProgress, MobileStepper, Paper, Typography, useTheme } from "@mui/material";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import { EditShow } from "./EditShow";
import { ShowLookUp } from "./ShowLookUp";
import { SearchResultsModel } from "../../models/SearchResultsModel";
import { ErrorMessage } from "../ErrorMessage";

const steps = ["Search", "Create"];

export interface NewShowProps {


    show: ShowModel;
    showTypeIds: CodeValueModel[];
    transactionItems: TransactionItemModel[];
    onCancelSelectedShow: () => void;
    onShowSave: (show: ShowModel, searchSkippedOrEdit: boolean) => void;

    hasError: boolean;
    errors: string[];
    onCloseErrors: () => void;
    isLoading: boolean;
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
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkippedSteps((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });

        setSkipped(true);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSelectResult = (searchResult: SearchResultsModel) => {
        setSelectedResult(searchResult);
        props.show.id = searchResult.id.toString();
        props.show.api = searchResult.api;
        props.show.type = searchResult.type;

        props.show.showName = searchResult.name;

        let showTypeId = 1000;

        if(searchResult.type === 1) {
            const airDate = new Date(searchResult.airDate);
            const d = new Date();

            d.setDate(d.getDate() - 45);
            showTypeId = airDate >= d ? 1002 : 1001;
        }

        props.show.showTypeId = showTypeId;
        setActiveStep(1);
    }

    return (
        
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}
                
            >
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
            
            {activeStep === steps.length ? (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </>
            ) : (
                <Box>
                    {activeStep === 0 &&
                        <ShowLookUp 
                            onSelectResult={handleSelectResult}
                        />
                    }
                        {activeStep === 1 &&
                            <Box>
                                <EditShow
                                    show={props.show}
                                    transactionItems={props.transactionItems}
                                    showTypeIds={props.showTypeIds}
                                    onShowSave={props.onShowSave}
                                    onCancelSelectedShow={props.onCancelSelectedShow}
                                    searchSkippedOrEdit={skipped}
                                />
                                <ErrorMessage
                                    open={props.hasError}
                                    onClose={props.onCloseErrors}
                                    errors={props.errors}
                                />
                            </Box>
                        }
                        {activeStep === 0 &&
                            <Box sx={{
                                display: 'flex', flexDirection: 'row', pt: 0, position: 'fixed',
                                bottom: 0,
                                right: 0,
                                left: 0,
                                height: 48,
                                //paddingTop: 7,
                                backgroundColor: theme.palette.secondary.dark
                            }}>
                            {activeStep === 0 &&
                                <Button
                                    color="inherit"
                                    onClick={props.onCancelSelectedShow}
                                    sx={{ mr: 1 }}
                                >
                                    Cancel
                                </Button>
                            }
                            {/* {activeStep === 1 &&
                                <Button
                                    color="inherit"
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                            } */}
                            <Box sx={{ flex: '1 1 auto' }} />
                            {activeStep === 0 &&
                                <Button color="inherit" onClick={handleSkip}>
                                    Skip
                                </Button>
                            }
                            {/* {activeStep === 1 &&
                                <Button onClick={handleNext}>
                                    Save
                                </Button>
                            } */}
                        </Box>
                    }
                </Box>
            )}
            <Backdrop
                open={props.isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}