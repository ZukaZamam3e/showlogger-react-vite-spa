import { useEffect, useState } from "react";
import { CodeValueModel } from "../models/CodeValueModel";
import { ShowModel, createNewShow } from "../models/ShowModel";
import useFetchWithMsal from "../hooks/useFetchWithMsal";
import { protectedResources } from "../authConfig";
import { EditShow } from "./EditShow";
import { Backdrop, CircularProgress, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { ShowListSearch } from "./ShowListSearch";
import Grid from '@mui/material/Unstable_Grid2';
import { ShowCard } from "./ShowCard";

interface ShowsListProps {
    isMobile: boolean;
    search: string;
    currentPage: number;
    onSelectShow: (show: ShowModel) => void;
    setCurrentPage: (page:number) => void;
}

export const ShowsList = (props:ShowsListProps) => {
    const [shows, setShows] = useState<ShowModel[]>([]);
    const [loaded, setLoaded] = useState(false);
    const take = 10;

    const apiShow: any = useFetchWithMsal({
        scopes: protectedResources.oaprojectsApi.scopes.write,
    });

    useEffect(() => {
        if (!apiShow.data) {
            fetchMoreData(props.currentPage-1);
        }
    }, [apiShow.execute, apiShow.data]);

    useEffect(() => {
        fetchMoreData(props.currentPage-1);
    }, [props.currentPage]);

    const fetchMoreData = (page:number) => {
        setLoaded(false);
        const offset = page * take;
        apiShow.execute("GET", protectedResources.oaprojectsApi.showEndpoint + `/get?offset=${offset}&take=${take}&search=${props.search}`).then((res: any) => {
            if (!!res) {
                console.log(res);
                // const updatedShows = [...shows, ...res.model.shows];
                // console.log(res.model.shows);
                setShows(res.model.shows);
                setLoaded(true);
            }
        });
    }

    const onAddNextEpisode = (showId: number) => {
        apiShow.execute("POST", protectedResources.oaprojectsApi.showEndpoint + '/AddNextEpisode', { showId: showId }).then((res: any) => {
            if(!!res.model) {
                fetchMoreData(0);
                props.setCurrentPage(1);
            }
        });
    }

    const onDeleteShow = (showId: number) => {
        apiShow.execute("POST", protectedResources.oaprojectsApi.showEndpoint + '/Delete', { showId: showId }).then((res: any) => {
            if(!!res.model) {
                fetchMoreData(0);
                props.setCurrentPage(1);
            }
        });
    }
    if (apiShow.isLoading) {
        return (
            <Backdrop
                open={true}
                sx={{ color: '#000', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    } else {
        return (
            <>
                {shows.map((show: ShowModel, index) => (
                    <ShowCard
                        key={show.showId}
                        show={show}
                        isMobile={props.isMobile}
                        onSelectShow={props.onSelectShow}
                        onAddNextEpisode={onAddNextEpisode}
                        onDeleteShow={onDeleteShow}
                    />
                ))}
            </>
        )
    }
}