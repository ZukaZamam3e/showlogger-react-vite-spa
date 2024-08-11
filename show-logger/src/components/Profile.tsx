import React, { useEffect, useState } from 'react';
import { User, useAuth0 } from '@auth0/auth0-react';
// import { protectedResources } from '../auth_config.js';

export const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0<User>();
  const [userMetadata, setUserMetadata] = useState(null);

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
            'No user metadata defined'
          )}
        </div>
      ) : (
        <div>Not logged in...</div>
      )}
    </>
  );
};
