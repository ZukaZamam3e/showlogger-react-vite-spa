import { placements } from '../../config/placementConfig';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface FabAddProps {
  onAddClick: () => void;
}

export const FabAdd = (props: FabAddProps) => {
  return (
    <>
      <Fab
        sx={{
          position: 'fixed',
          bottom: placements.fab.secondIconBottom,
          right: placements.fab.right,
        }}
        color="success"
        aria-label="add"
        onClick={props.onAddClick}
      >
        <AddIcon />
      </Fab>
    </>
  );
};
