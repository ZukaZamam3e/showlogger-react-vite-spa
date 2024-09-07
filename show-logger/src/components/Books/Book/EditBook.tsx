import { Box, Fab, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { placements } from '../../../config/placementConfig';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { SLTextField } from '../../Common/SLTextField';
import { BookModel } from '../../../models/BookModel';
import { SLDatePicker } from '../../Common/SLDatePicker';

interface EditBookProps {
  book: BookModel;
  onCancelSelectedBook: () => void;
  onBookSave: (book: BookModel) => void;
}

export const EditBook = (props: EditBookProps) => {
  const [book, setBook] = useState<BookModel>(props.book);

  const handleChange = (e: any) => {
    const updatedBook = () => {
      if (e.target.name === 'chapters' || e.target.name === 'pages') {
        let value = parseInt(e.target.value);

        return { ...book, [e.target.name]: value };
      } else {
        return { ...book, [e.target.name]: e.target.value };
      }
    };

    setBook(updatedBook());
  };

  const handleStartDateChange = (value: any) => {
    console.log('changing start date');
    const updatedBook = {
      ...book,
      ['startDate']: value != null ? value.toDate() : null,
    };
    console.log(updatedBook);

    setBook(updatedBook);
  };

  const handleEndDateChange = (value: any) => {
    const updatedBook = {
      ...book,
      ['endDate']: value != null ? value.toDate() : null,
    };
    setBook(updatedBook);
  };

  const handleBookSave = () => {
    const saveData: BookModel = { ...book };

    props.onBookSave(saveData);
  };

  return (
    <Box
      sx={{
        paddingBottom: {
          xs: '185px',
          sm: '185px',
          md: '52px',
          lg: '52px',
        },
      }}
    >
      <Paper
        sx={{
          borderStyle: 'solid',
          borderWidth: '2px',
          borderColor: 'white',
          borderRadius: 3,
          m: 2,
          padding: 3,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid xs={12}>
            <SLTextField
              fullWidth
              name="bookName"
              label="Name"
              defaultValue={book.bookName}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12}>
            <SLDatePicker
              label="Start Date"
              date={book.startDate}
              onDateChange={handleStartDateChange}
            />
          </Grid>
          <Grid xs={12}>
            <SLDatePicker
              label="End Date"
              date={book.endDate}
              onDateChange={handleEndDateChange}
            />
          </Grid>
          <Grid xs={12}>
            <SLTextField
              fullWidth
              name="chapters"
              label="Chapters"
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={book.chapters}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12}>
            <SLTextField
              fullWidth
              name="pages"
              label="Pages"
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={book.pages}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12}>
            <SLTextField
              fullWidth
              name="bookNotes"
              label="Notes"
              multiline
              defaultValue={book.bookNotes}
              onChange={handleChange}
            />
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
          onClick={handleBookSave}
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
          onClick={props.onCancelSelectedBook}
        >
          <CancelIcon />
        </Fab>
      </Paper>
    </Box>
  );
};
