import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query"

export const useFetch = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const getData = async (endpoint: string) => {
        if (isAuthenticated) {
            let accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: "https://oaprojects-api.oaprojects.net",
                    scope: "User.ReadWrite"
                }
            });

            const headers = new Headers();
            const bearer = `Bearer ${accessToken}`;
            //console.log(accessToken);
            headers.append("Authorization", bearer);

            let options = {
                method: "GET",
                headers: headers,
            };

            const response = (await fetch(endpoint, options));

            return response;
        }
    }

    const postData = async (endpoint: string, data:any) => {
        if (isAuthenticated) {
            let accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: "https://oaprojects-api.oaprojects.net",
                    scope: "User.ReadWrite"
                }
            });

            const headers = new Headers();
            const bearer = `Bearer ${accessToken}`;
            headers.append("Authorization", bearer);
            headers.append("Content-Type", "application/json");

            let options = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            };

            const response = (await fetch(endpoint, options));

            return response;
        }
    }

    return {
        getData,
        postData
    }
}

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