import { useAuth0 } from '@auth0/auth0-react';
import {
    useState,
    useCallback,
} from 'react';

import { protectedResources } from '../auth_config.js';

const useFetchWithAuth0 = (auth0Request) => {
    const { getAccessTokenSilently } = useAuth0();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const execute = async (method, endpoint, data = null) => {
        const domain = protectedResources.auth0.domain;
  
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "openid User.ReadWrite profile email offline_access",
          },
        });
  
        if (accessToken) {
            try {
                let response = null;

                const headers = new Headers();
                const bearer = `Bearer ${accessToken}`;
                headers.append("Authorization", bearer);

                if (data) headers.append('Content-Type', 'application/json');

                let options = {
                    method: method,
                    headers: headers,
                    body: data ? JSON.stringify(data) : null,
                };

                setIsLoading(true);
                response = (await fetch(endpoint, options));

                if ((response.status === 200 || response.status === 201)) {
                    let responseData = response;

                    try {
                        responseData = await response.json();
                    } catch (error) {
                        console.log(error);
                    } finally {
                        setData(responseData);
                        setIsLoading(false);
                        return responseData;
                    }
                }

                setIsLoading(false);
                return response;
            } catch (e) {
                setError(e);
                setIsLoading(false);
                throw e;
            }
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    return {
        isLoading,
        error,
        data,
        execute: useCallback(execute), // to avoid infinite calls when inside a `useEffect`
    };
}

export default useFetchWithAuth0;