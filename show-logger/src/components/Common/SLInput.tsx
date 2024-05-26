import { OutlinedInput } from "@mui/material"

export const SLInput = (props:any) => {
    const handleFocus = (event:any) => {
        event.target.select();
    }

    return <OutlinedInput
        onFocus={handleFocus}
        {...props}
    />
}