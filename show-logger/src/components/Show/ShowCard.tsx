import { ShowModel } from "../../models/ShowModel";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForewardIcon from '@mui/icons-material/FastForward';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import nia_landscape from './../../assets/nia_landscape.png'

interface ShowCardProps {
    show: ShowModel;
    isMobile: boolean;
    onSelectShow: (show: ShowModel) => void;
    onAddNextEpisode: (showId: number) => void;
    onDeleteShow: (showId: number) => void;
    onAddOneDay: (showId: number) => void;
    onSubtractOneDay: (showId: number) => void;
}

export const ShowCard = (props: ShowCardProps) => {
    const isTV = props.show.showTypeId === 1000;
    const isAMC = props.show.showTypeId === 1002;

    const sxButton = { border: 1, borderRadius: '25%' };
    const episodeName = <a target="_blank" href={props.show.infoUrl}>{props.show.episodeName}</a>
    const showTypeAndNumber = <>{props.show.showTypeIdZ} {isTV && <> - {props.show.seasonEpisode}</>}</>
    const runtime = <>{props.show.runtime && <>{props.show.runtimeZ}</>}</>

    const showName = isTV ? <>{props.show.showName}</> : <a target="_blank" href={props.show.infoUrl}>{props.show.showName}</a>;
    
    const sxCardHeader = {
        fontSize: '14px',
        paddingBottom: props.show.imageUrl ? '16' : '0'
    };

    const sxCardContent = {
        paddingTop: props.show.imageUrl ? '16' : '0'
    }

    let imageUrl = props.show.imageUrl;

    if(imageUrl == "") {
        imageUrl = nia_landscape;
    }

    

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardMedia
                component="img"
                image={imageUrl}
                sx={{
                    height: {
                        xs: 145,
                        sm: 265,
                    }
                }}
            />
            <Grid container spacing={1} alignItems="center" justifyContent="space-between"
                sx={{
                    p: 1,
                    minHeight: {
                        xs: 155,
                        sm: 255,
                    }
                }}
            >
                <Grid xs={6} sm={12}
                    sx={{
                        minHeight: 128,
                        p: 1,
                        mt: {
                            xs: 0,
                            sm: 0,
                          }
                    }}
                >
                    <Typography variant="body2" color="text.primary" sx={{ fontSize: 18 }}>
                        {showName}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        {episodeName}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        {showTypeAndNumber}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        {props.show.dateWatched && new Date(props.show.dateWatched).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        {runtime}
                    </Typography>
                    {isAMC &&
                    <>
                    <Typography variant="body2" color="text.r">
                        {runtime}
                    </Typography>
                    {/* <Typography variant="body2" color="text.r">
                        {runtime}
                    </Typography>
                    <Typography variant="body2" color="text.r">
                        {runtime}
                    </Typography>
                    <Typography variant="body2" color="text.r">
                        {runtime}
                    </Typography> */}
                    </>}
                </Grid>
                <Grid xs={6} sm={12}>
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                            <IconButton
                                aria-label="Edit"
                                sx={sxButton}
                                onClick={() => { props.onSelectShow(props.show) }}
                            >
                                <EditIcon />
                            </IconButton>
                            {isTV &&
                                <IconButton
                                    aria-label="Add Next Episode"
                                    sx={sxButton}
                                    onClick={() => { props.onAddNextEpisode(props.show.showId) }}
                                >
                                    <AddIcon />
                                </IconButton>
                            }
                            <IconButton
                                aria-label="Delete"
                                sx={sxButton}
                                onClick={() => { props.onDeleteShow(props.show.showId) }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                        {isTV &&
                            <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                                <IconButton
                                    aria-label="Subtract One Day"
                                    sx={sxButton}
                                    onClick={() => { props.onSubtractOneDay(props.show.showId) }}
                                >
                                    <FastRewindIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="Add One Day"
                                    sx={sxButton}
                                    onClick={() => { props.onAddOneDay(props.show.showId) }}
                                >
                                    <FastForewardIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="Binge"
                                    sx={sxButton}
                                    onClick={() => { props.onSelectShow(props.show) }}
                                >
                                    <TrackChangesIcon />
                                </IconButton>
                            </Stack>
                        }
                    </Stack>
                </Grid>
            </Grid>

            {/* <CardContent
                // sx={sxCardContent}
            >
                <Typography variant="h6" color="text.primary">
                    {props.show.showName}
                </Typography>
                <Typography variant="body2" color="text.primary">
                    {episodeName}
                </Typography>
                <Typography variant="body2" color="text.r">
                    {showTypeAndNumber}
                </Typography>
                <Typography variant="body2" color="text.r">
                    {props.show.dateWatched && new Date(props.show.dateWatched).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.r">
                    {runtime}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    mt: 'auto',
                }}
            >
                <Stack direction="column" spacing={2} sx={{ margin: '0 auto' }}>
                    <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
                        <IconButton
                            aria-label="Edit"
                            sx={sxButton}
                            size={'small'}
                            onClick={() => { props.onSelectShow(props.show) }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            aria-label="Add Next Episode"
                            sx={sxButton}
                            size={'small'}
                            onClick={() => { props.onSelectShow(props.show) }}
                        >
                            <AddIcon />
                        </IconButton>
                        <IconButton
                            aria-label="Delete"
                            sx={sxButton}
                            size={'small'}
                            onClick={() => { props.onSelectShow(props.show) }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
                        <IconButton
                            aria-label="Subtract One Day"
                            sx={sxButton}
                            size={'small'}
                            onClick={() => { props.onSelectShow(props.show) }}
                        >
                            <FastRewindIcon />
                        </IconButton>
                        <IconButton
                            aria-label="Add One Day"
                            sx={sxButton}
                            size={'small'}
                            onClick={() => { props.onSelectShow(props.show) }}
                        >
                            <FastForewardIcon />
                        </IconButton>
                        <IconButton
                            aria-label="Binge"
                            sx={sxButton}
                            size={'small'}
                            onClick={() => { props.onSelectShow(props.show) }}
                        >
                            <TrackChangesIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </CardActions> */}
        </Card>
    )
}

export const OldShowCard = (props: ShowCardProps) => {
    const showTypeIdZ = `${props.show.showTypeIdZ}${props.show.showTypeId === 1000 ?
        ` - s${props.show.seasonNumber?.toString().padStart(2, "0")}e${props.show.episodeNumber?.toString().padStart(2, "0")}`
        : ""}`

    const sxButton = { border: 1, borderRadius: '25%' };
    const isTV = props.show.showTypeId === 1000;

    const episodeNameUrl = <a target="_blank" href={props.show.infoUrl}>{props.show.episodeName}</a>
    const showName = <>{props.show.showName}{props.show.episodeName && <> - {episodeNameUrl}</>}</>
    const showTypeAndNumber = <>{props.show.showTypeIdZ} - {props.show.seasonEpisode}</>
    const runtime = <>{props.show.runtime && <>{props.show.runtimeZ}</>}</>

    return (
        <Grid xs={12} sx={{ margin: 2 }}>
            {props.isMobile ?
                <Card sx={{ border: 2, borderRadius: 3, padding: 2 }}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid xs={4}>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Grid container spacing={1}>
                                    <Grid xs={12} sx={{ justifyContent: "center" }}>
                                        <IconButton
                                            aria-label="Edit"
                                            sx={sxButton}
                                            size="small"
                                            onClick={() => { props.onSelectShow(props.show) }}
                                        >
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                    </Grid>
                                    <Grid xs={12} sx={{ display: 'flex', gap: 1, justifyContent: "center" }}>
                                        {isTV &&
                                            <IconButton
                                                aria-label="Add Next Episode"
                                                sx={sxButton}
                                                size="small"
                                                onClick={() => { props.onAddNextEpisode(props.show.showId) }}
                                            >
                                                <AddIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                        <IconButton
                                            aria-label="Delete"
                                            sx={sxButton}
                                            size="small"
                                            onClick={() => { props.onDeleteShow(props.show.showId) }}
                                        >
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Grid>
                        <Grid xs={8} sx={{ displyay: 'flex' }}>
                            <Typography
                                sx={{ fontSize: 13 }}
                                color="text.secondary"
                                component={'span'} variant={'body2'}
                            >
                                {props.show.showName}
                                {props.show.episodeName && <><br />{episodeNameUrl}</>}
                                <br />
                                {showTypeAndNumber}
                                <br />
                                {props.show.dateWatched && new Date(props.show.dateWatched).toLocaleDateString()}
                                {props.show.runtime && <><br />{props.show.runtimeZ}</>}
                            </Typography>

                        </Grid>
                    </Grid>
                </Card>
                :
                <Card sx={{ border: 2, borderRadius: 3, padding: 1 }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid xs={2} sx={{ justifyContent: "center", display: 'flex', gap: 2 }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                columnGap: '10px',
                                rowGap: '10px'
                            }}>
                                <IconButton
                                    aria-label="Edit"
                                    sx={sxButton}
                                    size="small"
                                    onClick={() => { props.onSelectShow(props.show) }}
                                >
                                    <EditIcon fontSize="inherit" />
                                </IconButton>
                                {isTV &&
                                    <IconButton
                                        aria-label="Add Next Episode"
                                        sx={sxButton}
                                        size="small"
                                        onClick={() => { props.onAddNextEpisode(props.show.showId) }}
                                    >
                                        <AddIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                <IconButton
                                    aria-label="Delete"
                                    sx={sxButton}
                                    size="small"
                                    onClick={() => { props.onDeleteShow(props.show.showId) }}
                                >
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton
                                    aria-label="Subtract One Day"
                                    sx={sxButton}
                                    size="small"
                                    onClick={() => { props.onSelectShow(props.show) }}
                                >
                                    <FastRewindIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton
                                    aria-label="Add One Day"
                                    sx={sxButton}
                                    size="small"
                                    onClick={() => { props.onSelectShow(props.show) }}
                                >
                                    <FastForewardIcon fontSize="inherit" />
                                </IconButton>
                                {isTV &&
                                    <IconButton
                                        aria-label="Binge Watch"
                                        sx={sxButton}
                                        size="small"
                                        onClick={() => { props.onAddNextEpisode(props.show.showId) }}
                                    >
                                        <TrackChangesIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            </div>
                        </Grid>
                        <Grid xs={3}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {showName}
                            </Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {props.show.seasonEpisode}{props.show.runtimeZ && <> - {props.show.runtimeZ}</>}
                            </Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {props.show.dateWatched && new Date(props.show.dateWatched).toLocaleDateString()}
                            </Typography>
                        </Grid>
                        <Grid xs={1}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {props.show.showTypeIdZ}
                            </Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {props.show.showNotes}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            }
        </Grid>
    );
}