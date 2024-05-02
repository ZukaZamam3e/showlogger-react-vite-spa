import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
// import jwt_decode from 'jwt-decode'
import axios from 'axios';
import { MyCustomButton } from './components/MyCustomButton';
//import { msalInstance } from "./index";
import { MsalProvider } from '@azure/msal-react';
import { HeadProvider, Title, Link, Meta } from 'react-head';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PageLayout } from './components/PageLayout';
import { Pages } from './components/Pages';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#121212',
      dark: '#272727',
    },
  },
  breakpoints: {
    values: {
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '16px',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          position: 'initial',
        },
      },
    },
  },
});

const App = () => {
  return (
    <HeadProvider>
      {/* <Link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <Link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        /> */}
      <Meta name="viewport" content="initial-scale=1, width=device-width" />

      <div
        className="App"
        style={
          {
            // width: '100vw'
          }
        }
        // style={appStyle}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            <PageLayout>
              <Pages />
            </PageLayout>
          </ThemeProvider>
        </LocalizationProvider>
      </div>
    </HeadProvider>
  );
};

export default App;
