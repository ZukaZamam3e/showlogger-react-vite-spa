import React, { useEffect, useState } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
// import { protectedResources } from '../auth_config.js';

export const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0<User>();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    // const getUserMetadata = async () => {
    //   const domain = protectedResources.auth0.domain;
  
    //   try {
    //     const accessToken = await getAccessTokenSilently({
    //       authorizationParams: {
    //         audience: `https://${domain}/api/v2/`,
    //         scope: "openid User.ReadWrite profile email offline_access",
    //       },
    //     });
  
    //     const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
  
    //     const metadataResponse = await fetch(userDetailsByIdUrl, {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     });
  
    //     const { user_metadata } = await metadataResponse.json();
  
    //     setUserMetadata(user_metadata);
    //   } catch (e:any) {
    //     console.log(e.message);
    //   }
    // };
  
    // getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

    return (
        <>
            <br />
            <br />
            <br />
            {isAuthenticated ? (
                <div>
                    <img src={user?.picture} alt={user?.name} />
                    <h2>{user?.name}</h2>
                    <p>{user?.email}</p>
                    <h3>User Metadata</h3>
                    {userMetadata ? (
                        <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
                    ) : (
                        "No user metadata defined"
                    )}
                </div>
            ) : (
                <div>Not logged in...</div>
            )}
        </>

    );
};