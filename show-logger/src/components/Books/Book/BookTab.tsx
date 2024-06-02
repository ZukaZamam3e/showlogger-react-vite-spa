import { useDispatch } from 'react-redux';
import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
import { useEffect, useState } from 'react';
import { BookModel, createNewBook } from '../../../models/BookModel';
import { List } from '../../Common/List';
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showErrors } from '../../../slices/errorsSlice';
import { placements } from '../../../config/placementConfig';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { protectedResources } from '../../../config/apiConfig';
import { BookCard } from './BookCard';
import { EditBook } from './EditBook';

export const BookTab = () => {
  const dispatch = useDispatch();

  const { getData, postData } = useFetch();
  const [books, setBooks] = useState<BookModel[]>([]);
  const [bookCount, setBookCount] = useState<number>(0);
  const [hideAddButton, setHideAddButton] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [editing, setEditing] = useState({
    show: false,
    editingBook: createNewBook(),
  });
  const take = 12;

  const load = async () => {
    dispatch(startLoading());
    await getData(
      `${protectedResources.oaprojectsApi.bookEndpoint}/load?take=${take}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setBooks(json.model.books);
          setBookCount(json.model.count);
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  const get = async (page: number, search: string) => {
    dispatch(startLoading());
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.bookEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setBooks(json.model.books);
          setBookCount(json.model.count);
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  const handleAddNew = () => {
    let newBook: BookModel = createNewBook();

    setEditing({ show: true, editingBook: newBook });
  };

  useEffect(() => {
    load();
  }, []);

  const handleSelectBook = (book: BookModel) => {
    setEditing({ show: true, editingBook: book });
  };

  const handleDeleteBook = async (bookId: number) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
    await postData(`${protectedResources.oaprojectsApi.bookEndpoint}/delete`, {
      bookId: bookId,
    })
      .then(async json => {
        if (json.errors.length == 0) {
          await get(0, '');
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(stopLoading());
      });

    await get(0, '');
  };

  const handleBookSave = async (book: BookModel) => {
    dispatch(startLoading());

    let url = `${protectedResources.oaprojectsApi.bookEndpoint}/save`;

    await postData(url, book)
      .then(async json => {
        if (json.errors.length == 0) {
          handleCancelSelectedBook();

          await get(0, '');
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  const handleCancelSelectedBook = () => {
    setEditing({ show: false, editingBook: createNewBook() });
  };

  const sxBody = {
    display: !editing.show ? 'initial' : 'none',
  };

  const editBook = editing.show && (
    <EditBook
      book={editing.editingBook}
      onCancelSelectedBook={handleCancelSelectedBook}
      onBookSave={handleBookSave}
    />
  );

  const body = (
    <div style={sxBody}>
      {!hideAddButton && (
        <Fab
          sx={{
            position: 'fixed',
            bottom: placements.fab.secondIconBottom,
            right: placements.fab.right,
          }}
          color="success"
          aria-label="add"
          onClick={handleAddNew}
        >
          <AddIcon />
        </Fab>
      )}
      <List count={bookCount} onGet={get} clearSearch={clearSearch} take={take}>
        {books.map((book: BookModel) => (
          <BookCard
            key={book.bookId}
            book={book}
            onSelectBook={handleSelectBook}
            onDeleteBook={handleDeleteBook}
          />
        ))}
      </List>
    </div>
  );

  return (
    <>
      {body}
      {editBook}
    </>
  );
};
