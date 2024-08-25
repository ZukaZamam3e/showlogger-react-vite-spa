import { BookYearStatModel } from '../../../models/BookYearStatModel';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';

interface BookYearStatCardProps {
  yearStat: BookYearStatModel;
  onSelect: (yearStat: BookYearStatModel) => void;
}

export const BookYearStatCard = (props: BookYearStatCardProps) => {
  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardHeader
          title={props.yearStat.name}
          subheader={props.yearStat.year}
          subheaderTypographyProps={{ color: 'text.primary' }}
          sx={{ pb: 0 }}
        />
        <CardContent
          sx={{
            minHeight: {
              xs: 0,
              sm: 135,
            },
            pt: 1,
          }}
        >
          <Typography variant="body2" color="text.primary">
            Books: {props.yearStat.bookCnt}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Chapters: {props.yearStat.chapterCnt}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Pages: {props.yearStat.pageCnt}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Averages
          </Typography>
          <Typography variant="body2" color="text.primary">
            Days: {props.yearStat.dayAvgZ}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Chapters: {props.yearStat.chapterAvgZ}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Pages: {props.yearStat.pageAvgZ}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Books per Month: {props.yearStat.monthAvgZ}
          </Typography>
          <Stack direction="column" spacing={2} sx={{ p: 2 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'center' }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  props.onSelect(props.yearStat);
                }}
              >
                See More
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
