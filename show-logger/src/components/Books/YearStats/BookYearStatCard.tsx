import { BookYearStatModel } from '../../../models/BookYearStatModel';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

interface BookYearStatCardProps {
  yearStat: BookYearStatModel;
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
            Average Days: {props.yearStat.dayAvgZ}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Average Chapters: {props.yearStat.chapterAvgZ}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Average Pages: {props.yearStat.pageAvgZ}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
