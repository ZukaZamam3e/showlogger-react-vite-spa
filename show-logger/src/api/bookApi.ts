import { useFetch } from '../hooks/useFetchOAProjectsAPI2';
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

  const getBook = async (page: number, search: string, take: number) => {
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

  return {
    loadBook,
    getBook,
  };
};
