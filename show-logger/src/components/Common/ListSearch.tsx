import { Box, Fab, InputAdornment, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { SLTextField } from './SLTextField';

interface ListSearchProps {
  searchText: string;
  onCancelSearch?: () => void;
  onSearchUpdate: (text: string) => void;
}

export const ListSearch = (props: ListSearchProps) => {
  const theme = useTheme();

  const boxSx = {
    position: 'fixed',
    bottom: {
      xs: 16 + 26 + 12,
      sm: 16 + 26,
    },
    left: 0,
    right: 0,
    backgroundColor: theme.palette.secondary.dark,
    p: 1,
  };
  const textfieldSx = {
    fieldset: { border: 2, borderRadius: 7.5 },
    width: '90%',
  };

  const handleChange = (e: any) => {
    props.onSearchUpdate(e.target.value);
  };

  return (
    <Box sx={boxSx}>
      <SLTextField
        sx={textfieldSx}
        label="Search"
        autoFocus
        value={props.searchText}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Fab
        sx={{
          position: 'fixed',
          bottom: {
            xs: 32 + 32 + 56 + 12,
            sm: 32 + 32 + 56,
          },
          right: 16,
        }}
        color="error"
        onClick={props.onCancelSearch}
      >
        <CancelIcon />
      </Fab>
    </Box>
  );
};
