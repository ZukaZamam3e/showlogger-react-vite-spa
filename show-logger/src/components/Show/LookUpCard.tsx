import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Paper, Stack, Typography, useTheme } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import { SearchResultsModel } from "../../models/SearchResultsModel"
import VisibilityIcon from '@mui/icons-material/Visibility';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import nia_portrait from './../../assets/nia_portrait.png'

export interface LookUpCardProps {
    searchResult: SearchResultsModel;
    onSelectResult: (searchResult: SearchResultsModel) => void;
}

export const LookUpCard = (props: LookUpCardProps) => {
    const theme = useTheme();
    const sxButton = { border: 1, borderRadius: '25%' };

    let imageUrl = props.searchResult.imageUrl;

    if(imageUrl == "") {
        imageUrl = nia_portrait;
    }

    const sxCard = {
        width: 250,
        borderRadius: '4px 0 0 4px',
        borderWidth: '3px 0px 3px 3px',
        borderStyle: 'solid',
        borderColor: 'white'
    };

    const sxCardImage = {
        width: 166,
        height: 250,
        borderRadius: '0px 4px 4px 0px',
        border: '3px solid white'
    }

    const sxCardHeader = {
        minHeight: 66,
    }

    const cardBody = {

    }

    return (
        <Card sx={{ display: 'flex' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: {
                        xs: 265,
                        sm: 213
                    }
                }}
            >
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="body2" color="text.primary" sx={{ fontSize: 18 }}>
                        <a target="_blank" href={props.searchResult.link}>{props.searchResult.name}</a>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {props.searchResult.airDateZ}
                    </Typography>
                </CardContent>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        sx={{pb: 2}}
                    >
                        <IconButton
                            aria-label="Watch"
                            sx={sxButton}
                            onClick={() => { props.onSelectResult(props.searchResult) }}
                        >
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton
                            aria-label="Watchlist"
                            sx={sxButton}
                            onClick={() => { }}
                        >
                            <QueryBuilderIcon />
                        </IconButton>
                    </Stack>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={imageUrl}
            />
        </Card>
    );

    return (
        <Box
            sx={{
                // height: 250,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: 0,
                backgroundColor: theme.palette.secondary.dark

            }}
        >
            <div style={sxCard}>
                <div style={sxCardHeader}>
                    {props.searchResult.name}
                </div>
                <div>
                    <p>
                        Air Date - {props.searchResult.airDateZ}
                    </p>
                </div>
                <div>
                    <Button
                        fullWidth
                        variant="contained"

                    >
                        Share
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"

                    >
                        Share
                    </Button>
                </div>
            </div>
            <img
                style={sxCardImage}
                src={props.searchResult.imageUrl}
            />
        </Box>
    )

    return (
        <Grid container>
            <Grid xs={8}>
                <Card
                    sx={{
                        height: 250,
                        borderRadius: '4px 0 0 4px'
                    }}

                >
                    <Grid container>
                        <Grid xs={12}
                            sx={{
                                mt: 1,
                                height: 135
                            }}>
                            <Typography component="div" variant="h5">
                                {props.searchResult.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {props.searchResult.airDateZ}
                            </Typography>
                        </Grid>
                        <Grid
                            xs={12}
                            sx={{
                                m: 1
                            }}>
                            <Button
                                fullWidth
                                variant="contained"

                            >
                                Share
                            </Button>
                        </Grid>
                        <Grid
                            xs={12}
                            sx={{
                                m: 1
                            }}
                        >
                            <Button
                                fullWidth
                                variant="contained"
                            >
                                Share
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid xs={4}>
                <img
                    src={props.searchResult.imageUrl}
                    width={166}
                    height={250}
                    style={{
                        borderRadius: '0 4px 4px 0'
                    }}
                />
            </Grid>
        </Grid>
    )


}