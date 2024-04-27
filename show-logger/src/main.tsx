import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import { HeadProvider } from 'react-head'

const headTags:any = [];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-3126h7e6syg2548p.us.auth0.com"
      clientId="7ignNAeVkeHsCgbfJQ7eUGNYe6okHRGj"
      authorizationParams={{
        //audience: "https://dev-3126h7e6syg2548p.us.auth0.com/api/v2/",
        audience: "https://oaprojects-api.oaprojects.net",
        redirect_uri: window.location.origin,
        scope: "openid profile email offline_access User.ReadWrite"
      }}
      useRefreshTokens={true}
      cacheLocation='localstorage'
    >
      <BrowserRouter>
        <HeadProvider headTags={headTags}>
          <App />
        </HeadProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
)
