import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../slices/isLoadingSlice';
import { showErrors } from '../slices/errorsSlice';

interface ApiResponseModel {
  model: any;
  errors: string[];
}

export const useFetch = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const getData = async (endpoint: string) => {
    dispatch(startLoading());
    const response = await fetchData(
      endpoint,
      createGetOptions(await checkAuth()),
    );
    dispatch(stopLoading());

    return response;
  };

  const postData = async (endpoint: string, data: any) => {
    dispatch(startLoading());
    const response = await fetchData(
      endpoint,
      createPostOptions(await checkAuth(), data),
    );
    dispatch(stopLoading());

    return response;
  };

  const checkAuth = async () => {
    let accessToken: string = '';

    try {
      if (isAuthenticated) {
        accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://oaprojects-api.oaprojects.net',
            scope: 'User.ReadWrite',
          },
        });
      }
    } catch {
      dispatch(showErrors(['Login session has expired. Please login again.']));
    }

    return accessToken;
  };

  const fetchData = async (endpoint: string, options: RequestInit) => {
    const response: ApiResponseModel = {
      model: null,
      errors: [],
    };

    try {
      if (isAuthenticated) {
        const fetchResponse = await fetch(endpoint, options)
          .then(data => (data ? data.json() : null))
          .catch(e => {
            return {
              errors: [e],
            };
          });

        response.errors = fetchResponse.errors;
        response.model = fetchResponse.model;
      }
    } catch {
      response.errors = ['Error during request. Please try again later.'];
    }

    if (response.errors.length > 0) {
      dispatch(showErrors(response.errors));
    }

    return response;
  };

  const createGetOptions = (accessToken: string) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append('Authorization', bearer);

    return {
      method: 'GET',
      headers: headers,
    };
  };

  const createPostOptions = (accessToken: string, data: any) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append('Authorization', bearer);
    headers.append('Content-Type', 'application/json');

    return {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    };
  };

  return {
    getData,
    postData,
  };
};

// export const useFetch = () => {
//     const { isAuthenticated, getAccessTokenSilently } = useAuth0();

//     const getData = async (endpoint: string) => {
//         const {
//             data,
//             error,
//             isLoading,
//         } = useQuery("getData", async () => {
//             if (isAuthenticated) {
//                 let accessToken = await getAccessTokenSilently({
//                     authorizationParams: {
//                         audience: "https://oaprojects-api.oaprojects.net",
//                         scope: "User.ReadWrite"
//                     }
//                 });

//                 const headers = new Headers();
//                 const bearer = `Bearer ${accessToken}`;
//                 headers.append("Authorization", bearer);

//                 let options = {
//                     method: "GET",
//                     headers: headers,
//                 };

//                 const response = (await fetch(endpoint, options));
//                 return response.json();
//             }
//         });

//         return {
//             data,
//             error,
//             isLoading,
//         }
//     }

//     return {
//         getData
//     }

// }
