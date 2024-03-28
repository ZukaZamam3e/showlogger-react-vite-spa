import { ShowModel } from "../models/ShowModel";
import { Box, Button, Card, CardActions, CardContent, IconButton, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

interface ShowCardProps {
    show: ShowModel;
    isMobile: boolean;
    onSelectShow: (show: ShowModel) => void;
    onAddNextEpisode: (showId: number) => void;
    onDeleteShow: (showId: number) => void;
}

export const ShowCard = (props: ShowCardProps) => {
    const showTypeIdZ = `${props.show.showTypeIdZ}${props.show.showTypeId === 1000 ?
        ` - s${props.show.seasonNumber?.toString().padStart(2, "0")}e${props.show.episodeNumber?.toString().padStart(2, "0")}`
        : ""}`

    const sxButton = { border: 1, borderRadius: '25%' };
    const isTV = props.show.showTypeId === 1000;

    return (
        <Grid xs={12}>
            {props.isMobile ?
                <Card sx={{ border: 2, borderRadius: 3, padding: .5 }}>
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
                                <br />
                                {showTypeIdZ}
                                <br />
                                {props.show.dateWatched && new Date(props.show.dateWatched).toLocaleDateString()}
                            </Typography>

                        </Grid>
                    </Grid>
                </Card>
                :
                <Card sx={{ border: 2, borderRadius: 3, padding: 1.5 }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid xs={4} sx={{ justifyContent: "center", display: 'flex', gap: 2 }}>
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
                        </Grid>
                        <Grid xs={3}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {props.show.showName}
                            </Typography>
                        </Grid>
                        <Grid xs={3}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {showTypeIdZ}
                            </Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {props.show.dateWatched && new Date(props.show.dateWatched).toLocaleDateString()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            }
        </Grid>
    );
}