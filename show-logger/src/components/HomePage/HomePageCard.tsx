import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

interface HomePageCardProps {
  title: string;
  description: string;
  navigateText: string;
  onNavigateClick: () => void;
  onSetDefaultAreaClick?: () => void;
  onUndoDefaultAreaClick?: () => void;
  currentDefaultAreaIndc?: boolean;
}

export const HomePageCard = (props: HomePageCardProps) => {
  let currentDefaultAreaIndc = false;
  if (props.currentDefaultAreaIndc != null) {
    currentDefaultAreaIndc = props.currentDefaultAreaIndc;
  }

  return (
    <Card>
      <CardContent
        sx={{
          textAlign: 'left',
          height: 115,
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={props.onNavigateClick}>
          {props.navigateText}
        </Button>
        {props.onSetDefaultAreaClick &&
          (!currentDefaultAreaIndc ? (
            <Button variant="outlined" onClick={props.onSetDefaultAreaClick}>
              Set as Default
            </Button>
          ) : (
            <Button variant="outlined" onClick={props.onUndoDefaultAreaClick}>
              Undo Default
            </Button>
          ))}
      </CardActions>
    </Card>
  );
};
