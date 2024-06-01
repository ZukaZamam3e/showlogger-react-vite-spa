import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

export const Loading = () => {
  const isLoading = useSelector((state: any) => state.isLoading.value);
  return (
    <Backdrop open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
