import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../slices/isLoadingSlice';
import { showErrors } from '../slices/errorsSlice';

export const useFetch2 = () => {
  const { isAuthenticated, getAccessTokenSilently, error } = useAuth0();
  const dispatch = useDispatch();

  const getData = async (endpoint: string) => {
    dispatch(startLoading());
    let accessToken;
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
      dispatch(stopLoading());
      const body = {
        errors: ['Login session has expired. Please login again.'],
      };
      dispatch(showErrors(body.errors));
      return body;
    }

    try {
      if (isAuthenticated) {
        const headers = new Headers();
        const bearer = `Bearer ${accessToken}`;

        headers.append('Authorization', bearer);

        let options = {
          method: 'GET',
          headers: headers,
        };

        const response = await fetch(endpoint, options)
          .then(data => (data ? data.json() : null))
          .catch(e => {
            return {
              errors: [e],
            };
          });
        dispatch(stopLoading());

        if (response.errors.length > 0) {
          dispatch(showErrors(response.errors));
        }

        return response;
      }
    } catch {
      dispatch(stopLoading());

      const body = {
        errors: ['Error during request. Please try again later.'],
      };
      dispatch(showErrors(body.errors));
      return body;
    }
    dispatch(stopLoading());
  };

  const postData = async (endpoint: string, data: any) => {
    dispatch(startLoading());
    let accessToken;
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
      dispatch(stopLoading());
      const body = {
        errors: ['Login session has expired. Please login again.'],
      };
      dispatch(showErrors(body.errors));
      return body;
    }

    try {
      if (isAuthenticated) {
        const headers = new Headers();
        const bearer = `Bearer ${accessToken}`;
        headers.append('Authorization', bearer);
        headers.append('Content-Type', 'application/json');

        let options = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        };

        const response = await fetch(endpoint, options)
          .then(data => (data ? data.json() : null))
          .catch(e => {
            return {
              errors: [e],
            };
          });
        dispatch(stopLoading());

        if (response.errors.length > 0) {
          dispatch(showErrors(response.errors));
        }

        return response;
      }
    } catch {
      dispatch(stopLoading());

      const body = {
        errors: ['Login session has expired. Please login again.'],
      };

      dispatch(showErrors(body.errors));

      return body;
    }

    dispatch(stopLoading());
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
