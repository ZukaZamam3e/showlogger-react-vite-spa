import { Card, Stack, Typography } from '@mui/material';
import { BookModel } from '../../../models/BookModel';
import { SLIconButton } from '../../Common/SLIconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Unstable_Grid2';

interface BookCardProps {
  book: BookModel;
  onSelectBook: (book: BookModel) => void;
  onDeleteBook: (bookId: number) => void;
}

export const BookCard = (props: BookCardProps) => {
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
              {props.book.bookName}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.book.startDate &&
                new Date(props.book.startDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.book.endDate &&
                new Date(props.book.endDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.book.chapters && <>Chapters: {props.book.chapters}</>}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.book.pages && <>Chapters: {props.book.pages}</>}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.book.bookNotes}
            </Typography>
          </Grid>
          <Grid xs={6} sm={12}>
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: 'center' }}
              >
                <SLIconButton
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
                </SLIconButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
