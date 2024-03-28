import { Box, Button, Card, Fab, FormGroup, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ShowModel } from "../models/ShowModel";
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useRef, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { CodeValueModel } from "../models/CodeValueModel";

interface EditShowProps {
    show: ShowModel;
    showTypeIds: CodeValueModel[];
    onCancelSelectedShow: () => void;
    onShowSave: (saveData: ShowModel) => void;
}

export const EditShow = (props: EditShowProps) => {
    const [show, setShow] = useState<ShowModel>(props.show);
    const [seasonNumber, setSeasonNumber] = useState(props.show.seasonNumber ?? 1);
    const [episodeNumber, setEpisodeNumber] = useState(props.show.episodeNumber ?? 1);

    // const inputSeasonNumber = useRef(null);
    // const inputEpisodeNumber = useRef(null);

    const onChange = (e: any) => {

        const updatedShow = () => {
            if(e.target.name === "seasonNumber" || e.target.name === "episodeNumber") {
                let value = parseInt(e.target.value);

                if(e.target.name === "seasonNumber") {
                    setSeasonNumber(value);
                } else {
                    setEpisodeNumber(value);
                }

                return { ...show, [e.target.name]: value };
            } else {
                return { ...show, [e.target.name]: e.target.value };
            }
        } 
        
        setShow(updatedShow());
    }

    const showDateOnChange = (value:any) => {
        const updatedShow = { ...show, ['dateWatched']: value.toDate() };
        setShow(updatedShow);
    }

    const showTypeIdOnChange = (
        event: React.MouseEvent<HTMLElement>,
        newValue: number) => {
        const updatedShow = { ...show, ['showTypeId']: newValue};
        setShow(updatedShow);
    }

    const onShowSave = () => {
        const saveData: ShowModel = { ...show };

        if(saveData.showTypeId != 1000) {
            saveData.episodeNumber = undefined;
            saveData.seasonNumber = undefined;
        }

        props.onShowSave(saveData);
    }

    const onAddSeasonNumber = () => {
        const updatedShow = { ...show, ['seasonNumber']: (show.seasonNumber ?? 0) + 1 };
        setShow(updatedShow);
        setSeasonNumber(() => updatedShow.seasonNumber);
    }

    const onResetEpisodeNumber = () => {
        const updatedShow = { ...show, ['episodeNumber']: 1 };
        setShow(updatedShow);
        setEpisodeNumber(() => updatedShow.episodeNumber);
    }

    return (
        <Paper sx={{ borderStyle: 'solid', borderWidth: '2px', borderColor: 'white', borderRadius: 3, padding: 3 }}>
            <Grid container spacing={3}  alignItems="center">
                <Grid xs={12}>
                    <DatePicker 
                        slotProps={{ textField: { fullWidth: true } }} 
                        label="Date Played" 
                        value={dayjs(show.dateWatched)} 
                        onChange={(value) => showDateOnChange(value)} 
                    />
                </Grid>
                <Grid xs={12}>
                    <ToggleButtonGroup
                        size="large"
                        color="primary"
                        exclusive
                        value={show.showTypeId}
                        onChange={showTypeIdOnChange}
                        fullWidth
                    >
                        {props.showTypeIds.map((showTypeId, index) => (
                            <ToggleButton value={showTypeId.codeValueId} key={showTypeId.codeValueId}>
                                {showTypeId.decodeTxt}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Grid>
                <Grid xs={12}>
                    <TextField 
                        fullWidth 
                        name="showName"
                        label="Name"
                        defaultValue={show.showName}
                        onChange={(e) => { onChange(e) }}
                    />
                </Grid>
                {show.showTypeId == 1000 &&
                    <Grid container spacing={3} xs={6}>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="seasonNumber"
                                label="Season"
                                type="number"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                value={seasonNumber}
                                onChange={(e) => { onChange(e) }}
                                //inputRef={inputSeasonNumber}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Button 
                                variant="contained" 
                                fullWidth 
                                sx={{ height: '100%' }}
                                onClick={onAddSeasonNumber}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                }
                {show.showTypeId == 1000 &&
                    <Grid container spacing={3} xs={6}>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="episodeNumber"
                                label="Episode"
                                type="number"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                value={episodeNumber}
                                onChange={(e) => { onChange(e) }}
                                // inputRef={inputEpisodeNumber}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Button 
                                variant="contained" 
                                disableElevation 
                                fullWidth 
                                sx={{ height: '100%' }}
                                onClick={onResetEpisodeNumber}
                            >
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                }
                <Grid xs={12}>
                    <TextField
                        fullWidth
                        name="showNotes"
                        label="Notes"
                        multiline
                        defaultValue={show.showNotes}
                        onChange={(e) => { onChange(e) }}
                    />
                </Grid>
            </Grid>

            <Fab
                sx={{ position: 'fixed', 'bottom': 16, 'right': 16 }}
                color="success"
                aria-label="add"
                onClick={onShowSave}
            >
                <SaveIcon />
            </Fab>
            <Fab
                sx={{ position: 'fixed', 'bottom': 32+56, 'right': 16 }}
                color="error"
                aria-label="add"
                onClick={props.onCancelSelectedShow}
            >
                <CancelIcon />
            </Fab>
        </Paper>
    );
}