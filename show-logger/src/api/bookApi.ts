import { useFetch } from '../hooks/useFetchOAProjectsAPI';
import { protectedResources } from '../config/apiConfig';
import { BookModel } from '../models/BookModel';

export const bookApi = () => {
  const { getData, postData } = useFetch();

  const loadBook = async (take: number) => {
    let data: BookModel[] = [];
    let count: number = 0;

    await getData(
      `${protectedResources.oaprojectsApi.bookEndpoint}/load?take=${take}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.books;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const getBook = async (page: number, take: number, search: string) => {
    let data: BookModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.bookEndpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.books;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const saveBook = async (book: BookModel) => {
    let data: BookModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.bookEndpoint}/save`,
      book,
    ).then(async json => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  const deleteBook = async (bookId: number) => {
    let success: boolean = false;
    await postData(`${protectedResources.oaprojectsApi.bookEndpoint}/delete`, {
      bookId: bookId,
    }).then(async json => {
      if (json.errors.length == 0) {
        success = true;
      }
    });

    return success;
  };

  return {
    loadBook,
    getBook,
    saveBook,
    deleteBook,
  };
};
