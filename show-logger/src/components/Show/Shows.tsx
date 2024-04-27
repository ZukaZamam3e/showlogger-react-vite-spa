import { AppBar, Box, Container, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { ShowsList } from "../Old/ShowsList";
import { ShowsTab } from "./ShowsTab";

interface ShowsTabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

export const ShowsTabPanel = (props: ShowsTabPanelProps) => {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{
                marginTop: 85
            }}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    )
}

export const Shows = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const tabsVarient: any = isMobile ? "scrollable" : "standard";
    const theme = useTheme();

    const tabs = [
        { id: 0, label: "Shows", content: <ShowsTab isMobile={isMobile} /> },
        { id: 1, label: "TV Stats", content: null },
        { id: 2, label: "Movie Stats", content: null },
        { id: 3, label: "Friends", content: null },
        { id: 4, label: "Year Stats", content: null },
        { id: 5, label: "Watchlist", content: null },
        { id: 6, label: "AMC", content: null },
    ];

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue);
        setSelectedTab(newValue);
    };


    useEffect(() => {
        detectWindowSize();
    }, [window.screen.width]);

    const detectWindowSize = () => {
        window.innerWidth <= 760 ? setIsMobile(true) : setIsMobile(false);
    }


    window.onresize = detectWindowSize;
    const tabWidth = isMobile ? '95vw' : 'initial';
    // window.onscroll = handleScroll;

    return (
        <>
            <div style={{
                position: 'fixed',
                left: 0,
                margin: '0 auto',
                alignItems: 'center',
                width: '100vw',
                top: 48,
                zIndex: 2,
                backgroundColor: theme.palette.background.default
            }}>
                <Stack
                    alignItems="center"
                >
                    <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    //centered={!isMobile}
                    allowScrollButtonsMobile
                    sx={{
                        width: tabWidth,
                        // border: '1px solid #90caf9'
                        "& .MuiTabScrollButton-root": {
                            width: "20px"
                        }
                    }}
                >
                    {tabs.map((tab: any, index) => (
                        <Tab
                            key={tab.id}
                            label={tab.label}
                            sx={{
                                minWidth: '45px',
                                padding: '14px 8px',
                                textTransform: 'none',
                                letterSpacing: 0
                            }}
                        />
                    ))}
                </Tabs>
                </Stack>
                
            </div>
            
            {tabs.map((tab: any, index) => (
                <ShowsTabPanel
                    key={tab.id}
                    index={tab.id}
                    value={selectedTab}
                >
                    {tab.content}
                </ShowsTabPanel>
            ))}
        </>
    )
}