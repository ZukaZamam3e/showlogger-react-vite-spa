export interface BookModel {
  bookId: number;
  bookName: string;
  startDate?: Date;
  endDate?: Date;
  chapters?: number;
  pages?: number;
  bookNotes?: string;
}

export const createNewBook = () => {
  const newBook: BookModel = {
    bookId: -1,
    bookName: '',
    startDate: undefined,
    endDate: undefined,
  };

  return newBook;
};
