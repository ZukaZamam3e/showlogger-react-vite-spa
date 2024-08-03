import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';
import { showMessage } from '../../slices/popupSlice';
import { useDispatch } from 'react-redux';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export const PopUpNotification = () => {
  const popup: any = useSelector((state: any) => state.popup);
  console.log(popup);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(showMessage({ show: false, message: '' }));
  };

  return (
    <Snackbar
      open={popup.show}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      message={popup.message}
      autoHideDuration={1200}
    />
  );
};
