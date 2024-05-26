import { TextField } from "@mui/material"

export const SLTextField = (props:any) => {
    const handleFocus = (event:any) => {
        event.target.select();
    }

    return <TextField
        onFocus={handleFocus}
        {...props}
    />
}