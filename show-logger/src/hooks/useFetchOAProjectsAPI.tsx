import { useAuth0,  } from "@auth0/auth0-react";

export const useFetch = () => {
    const { isAuthenticated, getAccessTokenSilently,  } = useAuth0();

    const getToken = async () => {
        return await getAccessTokenSilently();
    }

    const getData = async (endpoint: string) => {
        if (isAuthenticated) {
            // const accessToken = await getAccessTokenSilently({
            //     authorizationParams: {
            //         //audience: "https://oaprojects-api.oaprojects.net",
            //         scope: "User.ReadWrite"
            //     }
            // });

            let accessToken = await getAccessTokenSilently();

            //let url = `https://dev-3126h7e6syg2548p.us.auth0.com/authorize?client_id=7ignNAeVkeHsCgbfJQ7eUGNYe6okHRGj&protocol=oauth2&redirect_uri=https://jwt.io&response_type=token&scope=openid email&audience=https://oaprojects-api.oaprojects.net&nonce=123&state=xyz`;

            //const accessToken = await getAccessTokenSilently();

            //accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNIb1NaakFpNEtwZnZxOElvUjN5ZyJ9.eyJpc3MiOiJodHRwczovL2Rldi0zMTI2aDdlNnN5ZzI1NDhwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMzE2NjgxNjI3Nzg3MDc0MTgxMCIsImF1ZCI6WyJodHRwczovL29hcHJvamVjdHMtYXBpLm9hcHJvamVjdHMubmV0IiwiaHR0cHM6Ly9kZXYtMzEyNmg3ZTZzeWcyNTQ4cC51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzExNTQyODQ1LCJleHAiOjE3MTE2MjkyNDUsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgVXNlci5SZWFkV3JpdGUiLCJhenAiOiI3aWduTkFlVmtlSHNDZ2JmSlE3ZVVHTlllNm9rSFJHaiJ9.qWVzUdOP_fxZDcVHLaNdsCb6dKaqFW-ThRjdlxiZNFeoQT338iLJ2qbpL8oyKyjpj9DcwirpnTr78Bto403KvKmJIhv9IPAZdDog_IvJ74xzOV7u8FkwWI4pOyGdYepJrH7VL2AXbNHBeP1HH6xc1fU4V9LUpLpk2nEFmyt46AdYzO3TrWgzbHXjRKLTbyjQh6JJ5sfnFf7L72yT2UBKQ7vEe6wovP8STFxAwoZpBfwrssUt6Ih3bXr_CUIAQQJucB5OFcM4mRevrVYNHT25Bg47GHT1KO1H-M3E96eBDPc4kxv4V1OPq9MltzPrbcyIgUCY8Tza0FcHpGtIrVbzLA';

            console.log(accessToken);
            let response = null;
            const headers = new Headers();
            const bearer = `Bearer ${accessToken}`;
            headers.append("Authorization", bearer);

            let options = {
                method: "GET",
                headers: headers,
            };

            response = (await fetch(endpoint, options));
        }
    }

    return {
        getData
    }
}