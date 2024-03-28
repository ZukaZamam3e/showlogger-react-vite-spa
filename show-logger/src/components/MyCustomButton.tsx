import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import axios from 'axios'

export const MyCustomButton = () => {
    const [user, setUser] = useState<null|any>(null);
  const [token, setToken] = useState<null|string>(null);

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse);
            setToken(tokenResponse.access_token);
        },
    });

    const onTestGetClick = () => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

            axios.get(`https://localhost:7140/WeatherForecast`, { headers: headers })
                .then(res => {
                    const persons = res.data;
                })
    }

    return (
        <>
        <button onClick={() => login()}>Log In</button>
        <button onClick={onTestGetClick}>Test GET</button>
        </>
    )
}