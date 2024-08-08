import { useFetch } from '../hooks/useFetchOAProjectsAPI2';
import { protectedResources } from '../config/apiConfig';
import { UserPrefModel } from '../models/UserPrefModel';

export const loginApi = () => {
  const { getData, postData } = useFetch();

  const loadLogin = async () => {
    let data: UserPrefModel | null = null;

    await getData(
      `${protectedResources.oaprojectsApi.loginEndpoint}/load`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.userPref;
      }
    });

    return {
      data,
    };
  };

  const saveLogin = async (userPref: UserPrefModel) => {
    let data: UserPrefModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.loginEndpoint}/save`,
      userPref,
    ).then(async json => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  return {
    loadLogin,
    saveLogin,
  };
};
