import { Paper, Fab } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { SLTextField } from '../../Common/SLTextField';
import { useState } from 'react';
import { SLIconButton } from '../../Common/SLIconButton';
import ContentPaste from '@mui/icons-material/ContentPaste';
import { placements } from '../../../config/placementConfig';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { UpdateUnlinkedNameModel } from '../../../models/UpdateUnlinkedNameModel';

interface UpdateShowNameProps {
  showName: string;
  showTypeId: number;
  onUpdateShowName: (model: UpdateUnlinkedNameModel) => void;
  onCancelUpdateShowName: () => void;
}

export const UpdateShowName = (props: UpdateShowNameProps) => {
  const [newShowName, setNewShowName] = useState('');

  const handleContentPasteClick = async () => {
    const text = await navigator.clipboard.readText();
    setNewShowName(text);
  };

  const handleSaveClick = () => {
    props.onUpdateShowName({
      showName: props.showName,
      showTypeId: props.showTypeId,
      newShowName: newShowName,
    });
  };

  return (
    <>
      <Grid container spacing={3} alignItems="center">
        <Grid xs={12}>
          <Paper
            sx={{
              borderStyle: 'solid',
              borderWidth: '2px',
              borderColor: 'white',
              borderRadius: 3,
              m: 2,
              width: '90vw',
              padding: 3,
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid xs={12}>
                <SLTextField
                  fullWidth
                  name="showName"
                  label="Name"
                  defaultValue={props.showName}
                  disabled
                />
              </Grid>
              <Grid xs={10}>
                <SLTextField
                  fullWidth
                  name="newShowName"
                  label="New Show Name"
                  value={newShowName}
                  onChange={(e: any) => {
                    setNewShowName(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={2}>
                <SLIconButton
                  aria-label="Paste"
                  onClick={handleContentPasteClick}
                  style={{ borderRadius: '5px', padding: '12px' }}
                >
                  <ContentPaste style={{ color: 'green' }} />
                  Paste
                </SLIconButton>
              </Grid>
              {/* <Grid xs={12}>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={handleSearchClick}
              >
                Search
              </Button>
            </Grid> */}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Fab
        sx={{
          position: 'fixed',
          bottom: placements.fab.firstIconBottom,
          right: placements.fab.right,
        }}
        color="success"
        aria-label="add"
        onClick={handleSaveClick}
      >
        <SaveIcon />
      </Fab>
      <Fab
        sx={{
          position: 'fixed',
          bottom: placements.fab.secondIconBottom,
          right: placements.fab.right,
        }}
        color="error"
        aria-label="add"
        onClick={props.onCancelUpdateShowName}
      >
        <CancelIcon />
      </Fab>
    </>
  );
};
