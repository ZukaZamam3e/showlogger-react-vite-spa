import { UnlinkedShowModel } from '../../../models/UnlinkedShowModel';
import { Card, Stack, Typography } from '@mui/material';
import { SLIconButton } from '../../Common/SLIconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Unstable_Grid2';

interface UnlinkedShowCardProps {
  unlinkedShow: UnlinkedShowModel;
}

export const UnlinkedShowCard = (props: UnlinkedShowCardProps) => {
  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: 1,
            minHeight: {
              sm: 200,
            },
          }}
        >
          <Grid
            xs={6}
            sm={12}
            sx={{
              p: 1,
              mt: {
                xs: 0,
                sm: 0,
              },
            }}
          >
            <Typography variant="body2" color="text.primary">
              {props.unlinkedShow.showName}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.unlinkedShow.showTypeIdZ}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Watch Count: {props.unlinkedShow.watchCount}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.unlinkedShow.lastWatched && (
                <>
                  Last Watched:{' '}
                  {props.unlinkedShow.lastWatched &&
                    new Date(
                      props.unlinkedShow.lastWatched,
                    ).toLocaleDateString()}
                </>
              )}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.unlinkedShow.airDate && (
                <>
                  Air Date:{' '}
                  {props.unlinkedShow.airDate &&
                    new Date(props.unlinkedShow.airDate).toLocaleDateString()}
                </>
              )}
            </Typography>
            {/* <Typography variant="body2" color="text.primary">
              {props.unlinkedShow.lastDataRefresh && (
                <>
                  Last Data Refresh:{' '}
                  {props.unlinkedShow.lastDataRefresh &&
                    new Date(
                      props.unlinkedShow.lastDataRefresh,
                    ).toLocaleDateString()}
                </>
              )}
            </Typography> */}
            <Typography variant="body2" color="text.primary">
              In Show Logger:{' '}
              {props.unlinkedShow.inShowLoggerIndc ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid xs={6} sm={12}>
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: 'center' }}
              >
                {/* <SLIconButton
                  aria-label="Edit"
                  onClick={() => {
                    props.onSelectBook(props.book);
                  }}
                >
                  <EditIcon style={{ color: 'cornflowerblue' }} />
                </SLIconButton>
                <SLIconButton
                  aria-label="Delete"
                  onClick={() => {
                    props.onDeleteBook(props.book.bookId);
                  }}
                >
                  <DeleteIcon style={{ color: 'red' }} />
                </SLIconButton> */}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
