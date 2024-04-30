// /*
//  * Copyright (c) Microsoft Corporation. All rights reserved.
//  * Licensed under the MIT License.
//  */

// import { LogLevel } from "@azure/msal-browser";

// /**
//  * Configuration object to be passed to MSAL instance on creation.
//  * For a full list of MSAL.js configuration parameters, visit:
//  * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
//  */
// export const msalConfig = {
//     auth: {
//         clientId: '266d0c78-b88b-41b6-bead-2b8e3d195cda', // This is the ONLY mandatory field that you need to supply.
//         authority: 'https://login.microsoftonline.com/2e2f4c33-7455-4484-9731-dc3058288375', // Replace the placeholder with your tenant subdomain
//         redirectUri: '/', // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
//         postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
//         navigateToLoginRequestUrl: true,
//     },
//     cache: {
//         cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
//         storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
//     },
//     system: {
//         loggerOptions: {
//             /**
//              * Below you can configure MSAL.js logs. For more information, visit:
//              * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
//              */
//             loggerCallback: (level, message, containsPii) => {
//                 if (containsPii) {
//                     return;
//                 }
//                 // switch (level) {
//                 //     case LogLevel.Error:
//                 //         console.error(message);
//                 //         return;
//                 //     case LogLevel.Info:
//                 //         console.info(message);
//                 //         return;
//                 //     case LogLevel.Verbose:
//                 //         console.debug(message);
//                 //         return;
//                 //     case LogLevel.Warning:
//                 //         console.warn(message);
//                 //         return;
//                 //     default:
//                 //         return;
//                 // }
//             },
//         },
//     },
// };

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    oaprojectsApi: {
        weatherEndpoint: import.meta.env.VITE_APP_API_URL + '/WeatherForecast',
        authEndpoint: import.meta.env.VITE_APP_API_URL  + '/auth',
        showEndpoint: import.meta.env.VITE_APP_API_URL  + '/show',
        scopes: {
            write: ['api://89f937e2-f440-4ae3-86dc-b0ec5ba9a11c/User.ReadWrite'],
        }
    },
};

// /**
//  * Scopes you add here will be prompted for user consent during sign-in.
//  * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
//  * For more information about OIDC scopes, visit:
//  * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
//  */
// export const loginRequest = {
//     scopes: [
//         ...protectedResources.oaprojectsApi.scopes.write, 
//     ],
// };
