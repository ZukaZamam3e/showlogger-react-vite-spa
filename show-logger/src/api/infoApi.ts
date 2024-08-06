import { useFetch } from '../hooks/useFetchOAProjectsAPI2';
import { protectedResources } from '../config/apiConfig';
import { SearchResultsModel } from '../models/SearchResultsModel';

export const infoApi = () => {
  const { postData } = useFetch();

  const searchApi = async (api: number, type: number, name: string) => {
    let data: SearchResultsModel[] = [];
    await postData(
      `${protectedResources.oaprojectsApi.infoEndpoint}/searchapi`,
      {
        api: api,
        type: type,
        name: name,
      },
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.searchResults;
      }
    });

    return data;
  };

  return {
    searchApi,
  };
};
