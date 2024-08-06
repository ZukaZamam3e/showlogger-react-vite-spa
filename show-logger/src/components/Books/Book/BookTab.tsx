import { useEffect, useState } from 'react';
import { BookModel, createNewBook } from '../../../models/BookModel';
import { List } from '../../Common/List';
import { placements } from '../../../config/placementConfig';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { BookCard } from './BookCard';
import { EditBook } from './EditBook';
import { bookApi } from '../../../api/bookApi';

export const BookTab = () => {
  const { loadBook, getBook, saveBook, deleteBook } = bookApi();
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
    const { data, count } = await loadBook(take);
    setBooks(data);
    setBookCount(count);
  };

  const get = async (page: number, search: string) => {
    const { data, count } = await getBook(page, take, search);
    setBooks(data);
    setBookCount(count);
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
    const success = await deleteBook(bookId);

    if (success) {
      await get(0, '');
    }
  };

  const handleBookSave = async (book: BookModel) => {
    setClearSearch(prev => !prev);
    const updatedBook = await saveBook(book);

    if (updatedBook != null) {
      handleCancelSelectedBook();
      await get(0, '');
    }
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
