import { useTheme } from '@emotion/react';
import { Stack, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { TabPanel } from './TabPanel';
import { useSelector } from 'react-redux';

interface SLTabProps {
  tabs: any;
  changeToTab?: number;
}

export const SLTab = (props: SLTabProps) => {
  const theme: any = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useSelector((state: any) => state.isMobile.value);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    setSelectedTab(props.changeToTab ?? selectedTab);
  }, [props.changeToTab]);

  const tabWidth = isMobile ? '95vw' : 'initial';
  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: 0,
          margin: '0 auto',
          alignItems: 'center',
          width: '100vw',
          top: 48,
          zIndex: 2,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Stack alignItems="center">
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            //centered={!isMobile}
            allowScrollButtonsMobile
            sx={{
              width: tabWidth,
              '& .MuiTabScrollButton-root': {
                width: '20px',
              },
            }}
          >
            {props.tabs.map((tab: any) => (
              <Tab
                key={tab.id}
                label={tab.label}
                sx={{
                  minWidth: '45px',
                  padding: '14px 8px',
                  textTransform: 'none',
                  letterSpacing: 0,
                }}
              />
            ))}
          </Tabs>
        </Stack>
      </div>

      {props.tabs.map((tab: any) => (
        <TabPanel key={tab.id} index={tab.id} value={selectedTab}>
          {tab.content}
        </TabPanel>
      ))}
    </>
  );
};
