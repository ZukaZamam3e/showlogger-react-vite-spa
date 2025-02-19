import { placements } from '../../config/placementConfig';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

interface FabAddCancelProps {
  onAddClick: () => void;
  onCancelClick: () => void;
}

export const FabAddCancel = (props: FabAddCancelProps) => {
  return (
    <>
      <Fab
        sx={{
          position: 'fixed',
          bottom: placements.fab.firstIconBottom,
          right: placements.fab.right,
        }}
        color="success"
        aria-label="add"
        onClick={props.onAddClick}
      >
        <AddIcon />
      </Fab>
      <Fab
        sx={{
          position: 'fixed',
          bottom: placements.fab.secondIconBottom,
          right: placements.fab.right,
        }}
        color="error"
        aria-label="add"
        onClick={props.onCancelClick}
      >
        <CancelIcon />
      </Fab>
    </>
  );
};
