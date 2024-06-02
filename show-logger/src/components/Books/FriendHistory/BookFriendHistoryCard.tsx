import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { BookModel } from '../../../models/BookModel';

interface BookFriendHistoryCardProps {
  book: BookModel;
  name: string;
}

export const BookFriendHistoryCard = (props: BookFriendHistoryCardProps) => {
  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardHeader
          title={props.name}
          subheader={props.book.bookName}
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
            {props.book.startDate &&
              new Date(props.book.startDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.book.endDate &&
              new Date(props.book.endDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.book.chapters && <>Chapters: {props.book.chapters}</>}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.book.pages && <>Pages: {props.book.pages}</>}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.book.bookNotes}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
