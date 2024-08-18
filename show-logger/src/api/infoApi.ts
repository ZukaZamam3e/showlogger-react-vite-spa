import { useFetch } from '../hooks/useFetchOAProjectsAPI';
import { protectedResources } from '../config/apiConfig';
import { SearchResultsModel } from '../models/SearchResultsModel';
import { DownloadInfoModel } from '../models/DownloadInfoModel';

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

  const downloadInfo = async (searchResult: SearchResultsModel) => {
    let response: DownloadInfoModel = {
      id: -1,
      isSuccessful: false,
      result: '',
      showName: '',
    };
    await postData(
      `${protectedResources.oaprojectsApi.infoEndpoint}/downloadinfo`,
      {
        api: searchResult.api,
        type: searchResult.type,
        id: searchResult.id,
      },
    ).then(json => (response = json.model));

    return response;
  };

  return {
    searchApi,
    downloadInfo,
  };
};
