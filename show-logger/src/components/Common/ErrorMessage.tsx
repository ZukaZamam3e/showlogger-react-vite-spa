import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { hideErrors } from '../../slices/errorsSlice';
import { useDispatch } from 'react-redux';

export const ErrorMessage = () => {
  const errors: string[] = useSelector((state: any) => state.errors.value);
  const dispatch = useDispatch();

  const showErrors = errors.length > 0;

  const handleClose = () => {
    dispatch(hideErrors());
  };

  return (
    <Dialog open={showErrors} onClose={handleClose}>
      <DialogTitle>{'Error'}</DialogTitle>
      <DialogContent>
        {errors.map((error: string, index: number) => (
          <div key={index}>{error}</div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
