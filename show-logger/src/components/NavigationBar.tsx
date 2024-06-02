import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
// import { Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
// import { loginRequest } from '../authConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const NavigationBar = () => {
  const pages = [
    { title: 'Home', href: '/home' },
    { title: 'Shows', href: '/shows' },
    { title: 'Books', href: '/books' },
    { title: 'Info', href: '/info' },
    { title: 'Friends', href: '/friends' },
  ];

  const { isAuthenticated } = useAuth0();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const { instance } = useMsal();
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

  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

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
        {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
      </Toolbar>
    </AppBar>
  );
};
