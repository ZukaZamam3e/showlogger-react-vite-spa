import { AuthenticatedTemplate, MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionType } from '@azure/msal-browser';
// import { loginRequest, protectedResources } from "../authConfig";
// import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { Shows } from "./Show/Shows";

export const HomePage = () => {
    // const authRequest = {
    //     ...loginRequest,
    // };

    // const readGroups:any = useFetchWithMsal({
    //     scopes: protectedResources.oaprojectsApi.scopes.write,
    // });

    // const [activeGroupId, setActiveGroupId] = useState<number>(-1);

    // const fetchData = () => {
    //     readGroups.execute("GET", protectedResources.oaprojectsApi.weatherEndpoint + '/GetWeatherForecast').then((res:any) => {
    //         if (!!res) {
    //             console.log(res)
    //         }
    //     });
    // }

    // useEffect(() => {
    //     if(!readGroups.data) {
    //         fetchData();
    //     }
    // }, [readGroups.execute, readGroups.data]);

    return (
        <div>
            {/* Hello logged in user. */}
                <Shows />
            {/* {activeGroupId == -1
                ? <Backdrop
                    open={true}
                    sx={{ color: '#000', zIndex: (theme:any) => theme.zIndex.drawer + 1 }}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                : <GamesList groupId={activeGroupId} />
            } */}
            
        </div>
    );
}