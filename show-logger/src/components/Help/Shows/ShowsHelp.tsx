import { Card, CardContent, CardHeader, Typography } from '@mui/material';

export const ShowsHelp = () => {
  return (
    <>
      <Card>
        <CardHeader title="Adding a show/movie" />
        <CardContent>
          <Typography>
            1. Click the + icon in the bottom right to start adding a show
          </Typography>
          <Typography>
            2. Using the TMDB API, you can search for a TV Show or Movie
          </Typography>
          <Typography>
            3. After searching for a show or movie, click the eye icon to add it
            to your logger. Or, click the clock icon to add it to your watch
            list.
          </Typography>
          <Typography>
            4. If adding a TV Show, you can change the season or episode number
            if not starting at the beginning.
          </Typography>
          <Typography>
            5. The Continue/Restart Binge toggle will restart the streak in the
            TV Stats.
          </Typography>
          <Typography>
            6. Click Save, and you will now see the Show in your logger.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
