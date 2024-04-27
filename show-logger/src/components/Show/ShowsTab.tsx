import { useFetch } from "../../hooks/useFetchOAProjectsAPI";
import { protectedResources } from "../../config/apiConfig"
import { useEffect, useRef, useState } from "react";
import { ShowModel, createNewShow } from "../../models/ShowModel";
import { Backdrop, Box, CircularProgress, Fab, Pagination, Stack, useTheme } from "@mui/material";
import { CodeValueModel } from "../../models/CodeValueModel";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { ShowCard } from "./ShowCard";
import { EditShow } from "./EditShow";
import { ShowListSearch } from "./ShowListSearch";
import { TransactionItemModel } from "../../models/TransactionItemModel";
import { NewShow } from "./NewShow";
import { AddWatchFromSearchModel } from "../../models/AddWatchFromSearchModel";
import { ErrorMessage } from "../ErrorMessage";


interface ShowsTabProps {
    isMobile: boolean;
}

export const ShowsTab = (props: ShowsTabProps) => {
    const theme = useTheme();

    const { getData, postData } = useFetch();
    const [shows, setShows] = useState<ShowModel[]>([]);
    const [showCount, setShowCount] = useState<number>(0);
    const [showTypeIds, setShowTypeIds] = useState<CodeValueModel[]>([]);
    const [transactionItems, setTransactionItems] = useState<TransactionItemModel[]>([]);
    const [transactionTypeIds, setTransactionTypeIds] = useState<CodeValueModel[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);
    const [editing, setEditing] = useState({ show: false, editingShow: createNewShow() });
    const [creating, setCreating] = useState({ show: false, creatingShow: createNewShow() });
    const [searchText, setSearchText] = useState('');
    const [searchTimer, setSearchTimer] = useState<any>(null);
    const [errors, setErrors] = useState<string[]>([])

    const take = 12;

    let pages = showCount && Math.floor(showCount / take);

    if (showCount % take >= 1) {
        pages += 1;
    }

    const siblingCount = props.isMobile ? 0 : 1;

    const load = async () => {
        setIsLoading(true);
        await getData(`${protectedResources.oaprojectsApi.showEndpoint}/load?take=${take}`)
            .then(data => data ? data.json() : null)
            .then(json => {
                if (json.errors.length == 0) {
                    setShows(json.model.shows);
                    setShowCount(json.model.count);
                    setShowTypeIds(json.model.showTypeIds);
                    setTransactionTypeIds(json.model.transactionTypeIds);
                    setTransactionItems(json.model.transactionItems);
                } else {
                    setHasError(true);
                    setErrors(json.errors);
                }
            })
            .catch(() => {

            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const get = async (page: number, search: string) => {
        setIsLoading(true);
        const offset = page * take;
        await getData(`${protectedResources.oaprojectsApi.showEndpoint}/get?offset=${offset}&take=${take}&search=${search}`)
            .then(data => data ? data.json() : null)
            .then((json) => {
                if (json.errors.length == 0) {
                    setShows(json.model.shows);
                    setShowCount(json.model.count);
                } else {
                    setHasError(true);
                    setErrors(json.errors);
                }
            })
            .catch(() => {

            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleShowSave = async (show: ShowModel, searchSkippedOrEdit: boolean) => {
        setIsLoading(true);

        let url = `${protectedResources.oaprojectsApi.showEndpoint}/save`;
        let data: any = show;

        if (!searchSkippedOrEdit) {
            url = `${protectedResources.oaprojectsApi.showEndpoint}/addwatchfromsearch`;
            const watchFromSearch: AddWatchFromSearchModel = {
                api: show.api,
                type: show.type,
                id: show.id,
                showName: show.showName,
                showTypeId: show.showTypeId,
                showNotes: show.showNotes,
                restartBinge: show.restartBinge,
                dateWatched: show.dateWatched,
                episodeNumber: show.episodeNumber,
                seasonNumber: show.seasonNumber,
                transactions: show.transactions
            };

            data = watchFromSearch;
        }

        await postData(url, data)
            .then(data => data ? data.json() : null)
            .then(async (json) => {
                if (json.errors.length == 0) {
                    if (!searchSkippedOrEdit) {
                        handleCancelCreatingShow();
                    } else {
                        handleCancelSelectedShow();
                    }

                    await get(0, '');
                } else {
                    setHasError(true);
                    setErrors(json.errors);
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleAddNextEpisode = async (showId: number) => {
        clearSearch();
        setIsLoading(true);
        await postData(`${protectedResources.oaprojectsApi.showEndpoint}/addNextEpisode`, {
            showId: showId,
            dateWatched: new Date()
        })
            .then(data => data ? data.json() : null)
            .then(async (json) => {
                if (json.errors.length == 0) {
                    await get(0, '');
                } else {
                    setHasError(true);
                    setErrors(json.errors);
                }
            })
            .catch(() => {

            })
            .finally(() => {
                setIsLoading(false);
            });

        await get(0, '');
    }

    const handleDelete = async (showId: number) => {
        clearSearch();
        setIsLoading(true);
        await postData(`${protectedResources.oaprojectsApi.showEndpoint}/delete`, {
            showId: showId
        })
            .then(data => data ? data.json() : null)
            .then(async (json) => {
                if (json.errors.length == 0) {
                    await get(0, '');
                } else {
                    setHasError(true);
                    setErrors(json.errors);
                }
            })
            .catch(() => {

            })
            .finally(() => {
                setIsLoading(false);
            });

        await get(0, '');
    }

    const handleAddOneDay = async (showId: number) => {
        clearSearch();
        setIsLoading(true);
        await postData(`${protectedResources.oaprojectsApi.showEndpoint}/addoneday`, {
            showId: showId
        })
            .then(data => data ? data.json() : null)
            .then(async (json) => {
                if (json.errors.length == 0) {
                    await get(0, '');
                } else {
                    setHasError(true);
                    setErrors(json.errors);
                }
            })
            .catch(() => {

            })
            .finally(() => {
                setIsLoading(false);
            });

        await get(0, '');
    }

    const handleSubtractOneDay = async (showId: number) => {
        clearSearch();
        setIsLoading(true);
        await postData(`${protectedResources.oaprojectsApi.showEndpoint}/subtractoneday`, {
            showId: showId
        })
            .then(data => data ? data.json() : null)
            .then(async (json) => {
                if (json.errors.length == 0) {
                    await get(0, '');
                } else {
                    setHasError(true);
                    setErrors(json.errors);
                }
            })
            .catch(() => {

            })
            .finally(() => {
                setIsLoading(false);
            });

        await get(0, '');
    }

    const handleCancelSelectedShow = () => {
        setEditing({ show: false, editingShow: createNewShow() });
    }

    const handleCancelCreatingShow = () => {
        setCreating({ show: false, creatingShow: createNewShow() });
    }

    const handleSelectShow = (show: ShowModel) => {
        setEditing({ show: true, editingShow: show });
    }

    useEffect(() => {
        load();
    }, [])

    const handlePageOnChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage((prev) => value);
        get(value - 1, searchText);
    }

    const handleAddNew = () => {
        let newShow: ShowModel = createNewShow();

        setCreating({ show: true, creatingShow: newShow });
    }

    const handleToggleSearch = () => {
        setIsSearching((prev) => {
            if (prev) {
                handleSearchUpdate('');
            }
            return !prev;
        });


        // setZoom((prev) => !prev);
    }

    const clearSearch = () => {
        setIsSearching(false);
        setSearchText('');
        clearTimeout(searchTimer);
        setSearchTimer(null);
    }

    const handleSearchUpdate = (text: string) => {
        setSearchText(text);

        if (!!searchTimer) {
            clearTimeout(searchTimer);
            setSearchTimer(null);
        }

        if (searchText !== "") {
            const timer = setTimeout(() => {
                setPage(1);
                get(0, text);
            }, 250);

            setSearchTimer(timer);
        }



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

    const handleCloseErrors = () => {
        setErrors([]);
        setHasError(false);
    }

    // if (isLoading) {
    //     return (
    //         <Backdrop
    //             open={true}
    //         >
    //             <CircularProgress color="inherit" />
    //         </Backdrop>
    //     )
    // } else 
    
    if (editing.show) {
        return (
            <>
                <EditShow
                    show={editing.editingShow}
                    showTypeIds={showTypeIds}
                    transactionItems={transactionItems}
                    onCancelSelectedShow={handleCancelSelectedShow}
                    onShowSave={handleShowSave}
                    searchSkippedOrEdit={true}
                />
                <ErrorMessage
                    open={hasError}
                    onClose={handleCloseErrors}
                    errors={errors}
                />
                <Backdrop
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>

        )
    } else if (creating.show) {
        return (
            <NewShow
                show={createNewShow()}
                showTypeIds={showTypeIds}
                transactionItems={transactionItems}
                onCancelSelectedShow={handleCancelCreatingShow}
                onShowSave={handleShowSave}
                errors={errors}
                hasError={hasError}
                onCloseErrors={handleCloseErrors}
                isLoading={isLoading}
            />
        )
    } else {
        return (
            <>
                <Box
                    sx={{
                        width: '90vw',

                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            columnGap: '10px',
                            rowGap: '10px',
                            // paddingBottom: '185px',
                            paddingBottom: {
                                xs: '185px',
                                sm: '185px',
                                md: '52px',
                                lg: '52px',
                            },
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                                md: "1fr 1fr 1fr",
                                lg: "1fr 1fr 1fr 1fr",
                                xl: "1fr 1fr 1fr 1fr 1fr 1fr"
                            }
                        }}
                    >
                        {shows.map(((show: ShowModel) => (
                            <ShowCard
                                key={show.showId}
                                show={show}
                                isMobile={props.isMobile}
                                onSelectShow={handleSelectShow}
                                onAddNextEpisode={handleAddNextEpisode}
                                onDeleteShow={handleDelete}
                                onAddOneDay={handleAddOneDay}
                                onSubtractOneDay={handleSubtractOneDay}
                            />
                        )))}
                    </Box>
                    <Stack
                        alignItems="center"
                        sx={{
                            position: 'fixed',
                            bottom: 0,
                            right: 0,
                            left: 0,
                            height: 42,
                            //paddingTop: 7,
                            backgroundColor: theme.palette.secondary.dark
                        }}
                    >
                        <Pagination
                            sx={{
                                paddingTop: '7px'
                            }}
                            size="small"
                            siblingCount={siblingCount}
                            count={pages}
                            page={page}
                            onChange={handlePageOnChange}
                        />
                    </Stack>
                    {isSearching ?
                        <>
                            <ShowListSearch
                                searchText={searchText}
                                onCancelSearch={handleToggleSearch}
                                onSearchUpdate={handleSearchUpdate}
                            />
                        </>
                        :
                        <>
                            <Fab
                                sx={{ position: 'fixed', 'bottom': 32 + 16, 'right': 16 }}
                                color="success"
                                aria-label="add"
                                onClick={handleAddNew}
                            >
                                <AddIcon />
                            </Fab>
                            <Fab
                                sx={{ position: 'fixed', 'bottom': 32 + 32 + 56, 'right': 16 }}
                                color="info"
                                aria-label="add"
                                onClick={handleToggleSearch}
                            >
                                <SearchIcon />
                            </Fab></>
                    }
                </Box>
                <ErrorMessage
                    open={hasError}
                    onClose={handleCloseErrors}
                    errors={errors}
                />
            </>
        )
    }


}