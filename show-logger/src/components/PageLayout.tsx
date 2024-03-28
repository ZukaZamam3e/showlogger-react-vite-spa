import { AuthenticatedTemplate, MsalAuthenticationTemplate } from "@azure/msal-react";
import { ReactNode, useEffect, useState } from "react";
import { NavigationBar } from "./NavigationBar";
import { Box, Container, Paper } from "@mui/material";
// import { loginRequest, protectedResources } from "../authConfig";
// import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { InteractionType } from "@azure/msal-browser";
import { Profile } from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import {useFetch} from "../hooks/useFetchOAProjectsAPI"
import {protectedResources} from "../config/apiConfig"
// import useFetchWithAuth0 from "../hooks/useFetchWithAuth0";

interface PageLayoutProps {
    children: ReactNode;
}

export const PageLayout = ({children}:PageLayoutProps) => {
    const { isAuthenticated } = useAuth0();
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const { getData } = useFetch();
    // const authRequest = {
    //     ...loginRequest,
    // };

    // const apiAuth:any = useFetchWithAuth0({
    //     scopes: protectedResources.oaprojectsApi.scopes.write,
    // });

    const fetchData = async() => {
        await getData(protectedResources.oaprojectsApi.authEndpoint + '/login');
        // apiAuth.execute("GET", protectedResources.oaprojectsApi.authEndpoint + '/login').then((res:any) => {
        //     if (!!res) {
        //         setAuthenticated(res);
        //         console.log(res)
        //     }
        // });
    }

    // useEffect(() => {
    //     if(!apiAuth.data) {
    //         fetchData();
    //     }
    // }, [apiAuth.execute, apiAuth.data]);

    useEffect(() => {
        fetchData();
    })

    return (
        <>
            <NavigationBar />
            <br />
            {isAuthenticated ?
                <Container className="app_container" component="main">
                    <Box sx={{ my: 3 }}>
                        {children}
                    </Box>
                </Container>
                : <div>need to authenticate</div>
            }
            {/* <Profile /> */}
        </>
    );

    // return (
    //     <MsalAuthenticationTemplate
    //         interactionType={InteractionType.Redirect}
    //         authenticationRequest={authRequest}
    //     >
    //         <NavigationBar />
    //         <br />
    //         {authenticated ?
    //             <Container className="app_container" component="main">
    //                 <Box sx={{ my: 3 }}>
    //                     {children}
    //                 </Box>
    //             </Container>
    //             : <div>need to authenticate</div>
    //         }

    //     </MsalAuthenticationTemplate>
    // );
}
