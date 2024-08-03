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
import Grid from '@mui/material/Unstable_Grid2';
import { SearchResultsModel } from '../../../models/SearchResultsModel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import nia_portrait from '../../../assets/nia_portrait.png';
import { SLIconButton } from '../../Common/SLIconButton';

export interface LookUpCardProps {
  searchResult: SearchResultsModel;
  onWatchResult: (searchResult: SearchResultsModel, watchlist: boolean) => void;
}

export const LookUpCard = (props: LookUpCardProps) => {
  const theme = useTheme();

  let imageUrl = props.searchResult.imageUrl;

  if (imageUrl == '') {
    imageUrl = nia_portrait;
  }

  const sxCard = {
    width: 250,
    borderRadius: '4px 0 0 4px',
    borderWidth: '3px 0px 3px 3px',
    borderStyle: 'solid',
    borderColor: 'white',
  };

  const sxCardImage = {
    width: 166,
    height: 250,
    borderRadius: '0px 4px 4px 0px',
    border: '3px solid white',
  };

  const sxCardHeader = {
    minHeight: 66,
  };

  return (
    <Card sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: {
            xs: 265,
            sm: 213,
          },
        }}
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
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
          <SLIconButton
            aria-label="Watch"
            onClick={() => props.onWatchResult(props.searchResult, false)}
          >
            <VisibilityIcon />
          </SLIconButton>
          <SLIconButton
            aria-label="Watchlist"
            onClick={() => props.onWatchResult(props.searchResult, true)}
          >
            <QueryBuilderIcon />
          </SLIconButton>
        </Stack>
      </Box>
      <CardMedia component="img" sx={{ width: 151 }} image={imageUrl} />
    </Card>
  );
};
