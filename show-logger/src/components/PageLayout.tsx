import { ReactNode } from 'react';
import { NavigationBar } from './NavigationBar';
import { Box, Container } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Loading } from './Loading';
import { ErrorMessage } from './ErrorMessage';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { isAuthenticated } = useAuth0();

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
          {isAuthenticated ? children : <div>need to authenticate</div>}
        </Box>
        <Loading />
        <ErrorMessage />
      </Container>
    </Box>
  );
};
