import { AuthenticatedTemplate, MsalAuthenticationTemplate } from "@azure/msal-react";
import { ReactNode, useEffect, useState } from "react";
import { NavigationBar } from "./NavigationBar";
import { Box, Container, Paper } from "@mui/material";
// import { loginRequest, protectedResources } from "../authConfig";
// import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { InteractionType } from "@azure/msal-browser";
import { Profile } from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { useFetch } from "../hooks/useFetchOAProjectsAPI"
import { protectedResources } from "../config/apiConfig"
// import useFetchWithAuth0 from "../hooks/useFetchWithAuth0";

interface PageLayoutProps {
    children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
    const { isAuthenticated } = useAuth0();
    const { getData } = useFetch();
    
    const fetchData = async () => {
        await getData(protectedResources.oaprojectsApi.authEndpoint + '/login');
    }

    useEffect(() => {
        fetchData();
    })

    return (
        <Box sx={{
            maxWidth: { xs: '100vw', sm: '100vw', md: '100%', lg: '100%' },
            bgcolor: 'background.paper',

        }}
        >
            <NavigationBar />

            <br />
            <Container className="app_container" component="main"
                maxWidth={false}
                sx={{
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    paddingTop: '10px',
                }}>
                <Box sx={{ marginTop: 3 }}>
                    {isAuthenticated ?
                        children
                        : 
                        <div>need to authenticate</div>
                    }
                </Box>
            </Container>
        </Box>
    );
}
