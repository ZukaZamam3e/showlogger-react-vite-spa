import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;

//  let url = "https://dev-3126h7e6syg2548p.us.auth0.com/authorize?"
//  + "response_type=id_token&"
//  + "response_mode=form_post&"
//  + "client_id=7ignNAeVkeHsCgbfJQ7eUGNYe6okHRGj&"
//  + "redirect_uri=http://localhost:5173&"
//  + "nonce=NONCE"

//   return (<a href={url}>
//   Sign In
// </a>)
};