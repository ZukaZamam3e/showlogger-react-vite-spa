import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
// import { Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import MenuIcon, { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, } from "@mui/material";
// import { loginRequest } from '../authConfig';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

export const NavigationBar = () => {
    const pages = [
        {   title: "Home", href: "/" },
    ];
    
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElLogin, setAnchorElLogin] = useState<null | HTMLElement>(null);

    const { instance } = useMsal();
    const navigate = useNavigate();

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    // const handleLoginRedirect = () => {
    //     instance.loginRedirect(loginRequest)
    //         .catch((error) => console.log(error));
    // };

    // const handleLoginPopup = () => {
    //     /**
    //      * When using popup and silent APIs, we recommend setting the redirectUri to a blank page or a page 
    //      * that does not implement MSAL. Keep in mind that all redirect routes must be registered with the application
    //      * For more information, please follow this link: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md#redirecturi-considerations 
    //      */

    //     instance.loginPopup({
    //         ...loginRequest,
    //         redirectUri: '/redirect'
    //     }).catch((error) => console.log(error));
    // };

    // const handleLogoutRedirect = () => {
    //     instance.logoutRedirect({
    //         account: instance.getActiveAccount(),
    //     });
    // };

    // const handleLogoutPopup = () => {
    //     instance.logoutPopup({
    //         mainWindowRedirectUri: '/', // redirects the top level app after logout
    //         account: instance.getActiveAccount(),
    //     });
    // };

    // const handleOpenUserMenu = (event: any) => {
    //     setAnchorElUser(event.currentTarget);
    // }

    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // };

    // const handleOpenLoginMenu = (event: any) => {
    //     setAnchorElUser(event.currentTarget);

    // }

    // const handleCloseLoginMenu = () => {
    //     setAnchorElLogin(null);
    // };

    // const handleNavigateTo = (href:string) => {
    //     navigate(href);
    // }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
                        Show Logger
                    </Typography>
                    { !isAuthenticated 
                            ? <LoginButton />
                            : <LogoutButton />
                        }
                </Toolbar>
            </AppBar>
        </Box>
    );
};
