import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{
        marginTop: 45,
      }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
