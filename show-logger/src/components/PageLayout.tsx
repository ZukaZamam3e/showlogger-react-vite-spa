import { ReactNode, useEffect } from 'react';
import { NavigationBar } from './NavigationBar';
import { Box, Container } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Loading } from './Loading';
import { ErrorMessage } from './Common/ErrorMessage';
import { updateIsMobile } from '../slices/isMobileSlice';
import { useDispatch } from 'react-redux';
import { PopUpNotification } from './Common/PopUpNotification';
import { loginApi } from '../api/loginApi';
import { updateUserPref } from '../slices/userPrefSlice';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { loadLogin } = loginApi();
  const dispatch = useDispatch();

  const { isAuthenticated } = useAuth0();

  const loadUserPref = async () => {
    const { data } = await loadLogin();
    dispatch(updateUserPref(data));
  };

  useEffect(() => {
    loadUserPref();
  }, [isAuthenticated]);

  useEffect(() => {
    detectWindowSize();
  }, [window.screen.width]);

  const detectWindowSize = () => {
    window.innerWidth <= 760
      ? dispatch(updateIsMobile(true))
      : dispatch(updateIsMobile(false));
  };

  window.onresize = detectWindowSize;

  return (
    <Box
      sx={{
        // maxWidth: { xs: '100vw', sm: '100vw', md: '100%', lg: '100%' },
        bgcolor: 'background.paper',
      }}
    >
      <NavigationBar />

      <br />
      <Container
        className="app_container"
        component="main"
        sx={{
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingTop: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            marginTop: 3,
            justifyContent: 'center',
          }}
        >
          {isAuthenticated ? (
            children
          ) : (
            <div>
              <div>
                Please log in with your email you used in the old version.
              </div>
              <div>
                If this your first time logging in, please contact me and I will
                get you account set up.
              </div>
            </div>
          )}
        </Box>
        <Loading />
        <ErrorMessage />
        <PopUpNotification />
      </Container>
    </Box>
  );
};
