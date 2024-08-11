import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { SearchResultsModel } from '../../models/SearchResultsModel';
import nia_portrait from '../../assets/nia_portrait.png';
import { ReactNode } from 'react';

export interface SearchCardProps {
  searchResult: SearchResultsModel;
  children?: ReactNode;
}

export const SearchCard = (props: SearchCardProps) => {
  const theme = useTheme();

  let imageUrl = props.searchResult.imageUrl;

  if (imageUrl == '') {
    imageUrl = nia_portrait;
  }

  return (
    <Card
      sx={{
        display: 'flex',
        m: 'auto',
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 150, height: 225 }}
        image={imageUrl}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent
          sx={{ flex: '1 0 auto', width: { xs: 235, sm: 150, xl: 200 } }}
        >
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontSize: 18 }}
          >
            <a target="_blank" href={props.searchResult.link}>
              {props.searchResult.name}
            </a>
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.searchResult.airDateZ}
          </Typography>
        </CardContent>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ pb: 2 }}
        >
          {props.children}
        </Stack>
      </Box>
    </Card>
  );
};
