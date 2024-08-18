import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';

export const NavigationBar = () => {
  const userPref = useSelector((state: any) => state.userPref.value);

  const pages = [
    { title: 'Home', href: '/home' },
    { title: 'Shows', href: '/shows' },
    { title: 'Books', href: '/books' },
    { title: 'Friends', href: '/friends' },
  ];

  if (userPref && userPref.hasAdminRole) {
    pages.push({ title: 'Info', href: '/info' });
  }

  const { isAuthenticated } = useAuth0();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigateAndClose = (href: string) => {
    navigate(href);
    setAnchorElNav(null);
  };

  const load = async () => {};

  useEffect(() => {
    load();
  }, []);

  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            onClick={handleOpenNavMenu}
            color="inherit"
            disableRipple
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map(page => (
              <MenuItem
                key={page.title}
                onClick={() => navigateAndClose(page.href)}
              >
                <Typography textAlign="center">{page.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
          variant="h6"
          style={{ cursor: 'pointer' }}
          component="div"
          align="left"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate('/')}
        >
          Show Logger
        </Typography>

        {!isAuthenticated ? (
          <LoginButton />
        ) : (
          <>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map(page => (
                <Button
                  key={page.title}
                  onClick={() => navigate(page.href)}
                  sx={{ color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>
            <LogoutButton />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
