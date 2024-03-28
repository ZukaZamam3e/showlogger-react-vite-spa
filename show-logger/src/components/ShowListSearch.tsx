import { Box, Fab, InputAdornment, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRef, useState } from "react";

interface ShowListSearchProps {
    isMobile: boolean;
    onCancelSearch?: () => void;
    onSearchUpdate: (text:string) => void;
}

export const ShowListSearch = (props: ShowListSearchProps) => {
    let timer:any = null;

    const boxSx = props.isMobile ? { position: 'fixed', bottom: 16, left: 0, right: 0 } : undefined;
    const textfieldSx = props.isMobile
        ? { fieldset: { border: 2, borderRadius: 7.5 }, width: '90%' } 
        : { fieldset: { border: 2, borderRadius: 2 },  width: '50%' };

    const onChange = (e:any) => {
        if(!!timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => props.onSearchUpdate(e.target.value), 1000);
    }
    
    return (
        <Box sx={boxSx}>
            <TextField
                sx={textfieldSx}
                label="Search"
                onChange={(e) => { onChange(e) }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
            {props.isMobile &&
                <Fab
                    sx={{ position: 'fixed', 'bottom': 32 + 56, 'right': 16 }}
                    color="error"
                    aria-label="add"
                    onClick={props.onCancelSearch}
                >
                    <CancelIcon />
                </Fab>
            }
        </Box>
    );
}