import { Box, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { ShowsList } from "./ShowsList";
import { ShowsTab } from "./ShowsTab";

interface ShowsTabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

export const ShowsTabPanel = (props: ShowsTabPanelProps) => {
    const {children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    )
}

export const Shows = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const tabsVarient:any = isMobile ? "scrollable" : "standard";

    const tabs = [
        { id: 0, label: "Shows", content: null },
        { id: 1, label: "TV Stats", content: null },
        { id: 2, label: "Movies Stats", content: null },
        { id: 3, label: "Friends", content: null },
        { id: 4, label: "Year Stats", content: null },
        { id: 5, label: "Watchlist", content: null },
        { id: 6, label: "AMC", content: null },
    ];

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };


    useEffect(() => {
        detectWindowSize();
    }, [window.screen.width]);

    const detectWindowSize = () => {
        window.innerWidth <= 760 ? setIsMobile(true) : setIsMobile(false);        
    }
    
    window.onresize = detectWindowSize;
    // window.onscroll = handleScroll;

    return (
        <Box>
            <Box sx={{ width: '100%',borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    variant={tabsVarient}
                    centered={!isMobile}
                    //allowScrollButtonsMobile={isMobile}
                >
                    {tabs.map((tab: any, index) => (
                        <Tab
                            key={tab.id}
                            label={tab.label}
                        />
                    ))}
                </Tabs>
            </Box>
            {tabs.map((tab: any, index) => (
                <ShowsTabPanel
                    key={tab.id}
                    index={tab.id}
                    value={selectedTab}
                >
                    {tab.content}
                </ShowsTabPanel>
            ))}
        </Box>
    )
}