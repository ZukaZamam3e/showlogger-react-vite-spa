import { useEffect, useRef, useState } from "react";
import { ShowModel, createNewShow, getShowData } from "../models/ShowModel"
import { ShowCard } from "./ShowCard";
import Grid from '@mui/material/Unstable_Grid2';
import { Backdrop, BottomNavigation, Box, CircularProgress, Collapse, Fab, Fade, FormControlLabel, InputAdornment, Pagination, Paper, Switch, TextField, Zoom } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import useFetchWithMsal from "../hooks/useFetchWithMsal";
import { protectedResources } from "../authConfig";
import { EditShow } from "./EditShow";
import { CodeValueModel } from "../models/CodeValueModel";
import { ShowListSearch } from "./ShowListSearch";
import SearchIcon from '@mui/icons-material/Search';
import { useIsVisible } from "../hooks/useIsVisible";
import InfiniteScroll from "react-infinite-scroll-component";
import { ShowsList } from "./ShowsList";

interface ShowsTabProps {
    isMobile: boolean;
    isAtBottom?: boolean;
}

export const ShowsTab = (props: ShowsTabProps) => {
    const [shows, setShows] = useState<ShowModel[]>([]);
    const [moreShows, setMoreShows] = useState(false);
    const [showTypeIds, setShowTypeIds] = useState<CodeValueModel[]>([]);
    const [editing, setEditing] = useState({ show: false, editingShow: createNewShow() });
    const [loaded, setLoaded] = useState(false);
    const [searching, setSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [zoom, setZoom] = useState(false);
    const [search, setSearch] = useState('');
    const take = 10;
    const apiShowLoad: any = useFetchWithMsal({
        scopes: protectedResources.oaprojectsApi.scopes.write,
    });

    const apiShow: any = useFetchWithMsal({
        scopes: protectedResources.oaprojectsApi.scopes.write,
    });

    const apiShowGet: any = useFetchWithMsal({
        scopes: protectedResources.oaprojectsApi.scopes.write,
    });

    

    const fetchData = () => {
        setLoaded(false);
        apiShowLoad.execute("GET", protectedResources.oaprojectsApi.showEndpoint + '/load').then((res: any) => {
            if (!!res) {
                console.log(res);
                setShows(res.model.shows);
                setShowTypeIds(res.model.showTypeIds);
                setMoreShows(res.model.hasMore);
                setTotalPages(Math.ceil(res.model.count / take))
                setLoaded(true);
            }
        });
    }

    

    const fetchMoreData = (page:number) => {
        setLoaded(false);
        const offset = page * take;
        apiShowLoad.execute("GET", protectedResources.oaprojectsApi.showEndpoint + `/get?offset=${offset}&take=${take}&search=${search}`).then((res: any) => {
            if (!!res) {
                console.log(res);
                // const updatedShows = [...shows, ...res.model.shows];
                // console.log(res.model.shows);
                setShows(res.model.shows);
                setMoreShows(res.model.hasMore);
                setLoaded(true);
            }
        });
    }

    useEffect(() => {
        if (!apiShowLoad.data) {
            fetchData();
        }
    }, [apiShowLoad.execute, apiShowLoad.data]);

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         entries => {
    //             if (entries[0].isIntersecting) {
    //                 console.log('fetch more');
    //                 fetchMoreData();
    //             }
    //         },
    //         { threshold: 1 }
    //     );

    //     if (observerTarget.current) {
    //         observer.observe(observerTarget.current);
    //     }

    //     return () => {
    //         if (observerTarget.current) {
    //             observer.unobserve(observerTarget.current);
    //         }
    //     };
    // }, [observerTarget]);

    

    const onShowSave = (saveData: ShowModel) => {
        apiShow.execute("POST", protectedResources.oaprojectsApi.showEndpoint + '/Save', saveData).then((res: any) => {
            let newShow: ShowModel = createNewShow();

            setEditing({ show: false, editingShow: newShow });
            if(!!res.model) {
                const updatedShows = [ res.model, ...shows ];
                setShows(updatedShows);
            }
        });
    }

    const onSearchUpdate = (text:string) => {
        setSearch(text);
        setCurrentPage(1);
        fetchMoreData(0);
        // if(text !== '') {
        //     apiShow.execute("GET", protectedResources.oaprojectsApi.showEndpoint + `/Get?search=${text}`).then((res: any) => {
        //         setShows(res.model.shows);
        //     });
        // } else {
        //     apiShow.execute("GET", protectedResources.oaprojectsApi.showEndpoint + `/Get?offset=0`).then((res: any) => {
        //         setShows(res.model.shows);
        //     });
        // }
    }

    const addNew = () => {
        let newShow: ShowModel = createNewShow();

        setEditing({ show: true, editingShow: newShow });
    }

    const onSelectShow = (show: ShowModel) => {
        console.log(show)
        setEditing({show: true, editingShow: show});
    }


    const onCancelSelectedShow = () => {
        setEditing({ show: false, editingShow: createNewShow() });
        //fetchData();
    }

    const onAddNextEpisode = (showId: number) => {
        apiShow.execute("POST", protectedResources.oaprojectsApi.showEndpoint + '/AddNextEpisode', { showId: showId }).then((res: any) => {
            if(!!res.model) {
                //const updatedShows = [ res.model, ...shows ];
                //setShows(updatedShows);
                fetchMoreData(0);
                setCurrentPage(1);
            }
        });
    }

    const onDeleteShow = (showId: number) => {
        apiShow.execute("POST", protectedResources.oaprojectsApi.showEndpoint + '/Delete', { showId: showId }).then((res: any) => {
            if(!!res.model) {
                // const updatedShows = shows.filter((show) => show.showId !== showId);
                // setShows(updatedShows);
                fetchMoreData(0);
                setCurrentPage(1);
            }
        });
    }

    

    const onToggleSearch = () => {
        setSearching((prev) => {
            if(prev) {
                onSearchUpdate('');
            }
            return !prev;
        });

        
        // setZoom((prev) => !prev);
    }

    const onPageChange = (page:number) => {
        setCurrentPage(page);
        fetchMoreData(page-1);
    }

    const handleChange = () => {
        setZoom((prev) => !prev);
    }

    // if (apiShowLoad.isLoading || apiShow.isLoading) {
    //     return (
    //         <Backdrop
    //             open={true}
    //             sx={{ color: '#000', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
    //         >
    //             <CircularProgress color="inherit" />
    //         </Backdrop>
    //     )
    // } else 

    if (editing.show) {
        return (
            <EditShow
                show={editing.editingShow}
                showTypeIds={showTypeIds}
                onCancelSelectedShow={onCancelSelectedShow}
                onShowSave={onShowSave}
            />
        )
    // } else if (loaded) {
    } else {
        return (
            <>
                <Grid container spacing={1}>
                    <Grid xs={12}>
                        {!props.isMobile &&
                            <ShowListSearch
                                isMobile={props.isMobile}
                                onSearchUpdate={onSearchUpdate}
                            />}
                        {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControlLabel
        control={<Switch checked={zoom} onChange={handleChange} />}
        label="Show"
      />
                        </Box> */}
                    </Grid>
                {/* </Grid> */}
                <ShowsList 
                    currentPage={currentPage}
                    isMobile={props.isMobile}
                    onSelectShow={onSelectShow}
                    search={""}
                    setCurrentPage={setCurrentPage}
                />
                    {/* {shows.map((show: ShowModel, index) => (
                        <ShowCard
                            key={show.showId}
                            show={show}
                            isMobile={props.isMobile}
                            onSelectShow={onSelectShow}
                            onAddNextEpisode={onAddNextEpisode}
                            onDeleteShow={onDeleteShow}
                        />
                    ))} */}
                {/* <Grid container spacing={1}> */}
                    <Grid xs={12}>
                        <Pagination 
                            count={totalPages} 
                            page={currentPage}
                            variant="outlined" 
                            shape="rounded" 
                            sx={{display: "flex", justifyContent: 'center'}}
                            onChange={(event: any, page: number) => onPageChange(page)}
                        />
                    </Grid>
                </Grid>
                {searching ?
                    // <Fade in={searching}
                    // >
                    <>
                        {props.isMobile &&
                            <ShowListSearch
                                isMobile={props.isMobile}
                                onCancelSearch={onToggleSearch}
                                onSearchUpdate={onSearchUpdate}
                            />
                        }
                    </>

                    // </Fade>

                    :

                    // <Fade
                    //     in={!zoom}
                    // >
                    <div>
                        {props.isMobile &&
                            <Fab
                                sx={{ position: 'fixed', 'bottom': 96 + 64, 'right': 16 }}
                                color="primary"
                                aria-label="add"
                                onClick={onToggleSearch}
                            >
                                <SearchIcon />
                            </Fab>
                        }
                        <Fab
                            sx={{ position: 'fixed', 'bottom': 32, 'right': 16 }}
                            color="primary"
                            aria-label="add"
                            onClick={addNew}
                        >
                            <AddIcon />
                        </Fab>
                    </div>
                    // </Fade>
                }
            </>
        );
    } 
    // else {
    //     return <h1>Not handled case</h1>
    // }
}