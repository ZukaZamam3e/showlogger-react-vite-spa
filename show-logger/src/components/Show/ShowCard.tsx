import { ShowModel } from '../../models/ShowModel';
// import { ShowModel, formatter } from '../../models/ShowModel';
// import { Card, CardMedia, IconButton, Stack, Typography } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import AddIcon from '@mui/icons-material/Add';
// import FastRewindIcon from '@mui/icons-material/FastRewind';
// import FastForewardIcon from '@mui/icons-material/FastForward';
// import TrackChangesIcon from '@mui/icons-material/TrackChanges';
// import nia_landscape from './../../assets/nia_landscape.png';
import { TvCard } from '../Common/TvCard';
import { MovieCard } from '../Common/MovieCard';
import { AmcCard } from '../Common/AmcCard';

interface ShowCardProps {
  show: ShowModel;
  isMobile: boolean;
  onSelectShow: (show: ShowModel) => void;
  onAddNextEpisode: (showId: number) => void;
  onDeleteShow: (showId: number) => void;
  onAddOneDay: (showId: number) => void;
  onSubtractOneDay: (showId: number) => void;
  onBingeWatchShow: (show: ShowModel) => void;
}

export const ShowCard = (props: ShowCardProps) => {
  const isTV = props.show.showTypeId === 1000;
  const isMovie = props.show.showTypeId === 1001;
  const isAMC = props.show.showTypeId === 1002;

  let body;

  if (isTV) {
    body = (
      <TvCard
        show={props.show}
        isMobile={props.isMobile}
        onSelectShow={props.onSelectShow}
        onAddNextEpisode={props.onAddNextEpisode}
        onDeleteShow={props.onDeleteShow}
        onAddOneDay={props.onAddOneDay}
        onSubtractOneDay={props.onSubtractOneDay}
        onBingeWatchShow={props.onBingeWatchShow}
      />
    );
  } else if (isMovie) {
    body = (
      <MovieCard
        show={props.show}
        isMobile={props.isMobile}
        onSelectShow={props.onSelectShow}
        onDeleteShow={props.onDeleteShow}
      />
    );
  } else if (isAMC) {
    body = (
      <AmcCard
        show={props.show}
        isMobile={props.isMobile}
        onSelectShow={props.onSelectShow}
        onDeleteShow={props.onDeleteShow}
      />
    );
  }

  // const sxButton = { border: 1, borderRadius: '25%' };
  // const episodeName = (
  //   <a target="_blank" href={props.show.infoUrl}>
  //     {props.show.episodeName}
  //   </a>
  // );
  // const showTypeAndNumber = (
  //   <>
  //     {props.show.showTypeIdZ} {isTV && <> - {props.show.seasonEpisode}</>}
  //   </>
  // );
  // const runtime = <>{props.show.runtime && <>{props.show.runtimeZ}</>}</>;

  // const showName = isTV ? (
  //   <>{props.show.showName}</>
  // ) : (
  //   <a target="_blank" href={props.show.infoUrl}>
  //     {props.show.showName}
  //   </a>
  // );

  // const totalPurchases = props.show.totalPurchases ?? 0;

  // let imageUrl = props.show.imageUrl;

  // if (imageUrl == '') {
  //   imageUrl = nia_landscape;
  // }

  return body;

  // return (
  //   <Card
  //     sx={{
  //       display: 'flex',
  //       flexDirection: 'column',
  //     }}
  //   >
  //     <CardMedia
  //       component="img"
  //       image={imageUrl}
  //       sx={{
  //         height: {
  //           xs: 205,
  //           sm: 265,
  //         },
  //       }}
  //     />
  //     <Grid
  //       container
  //       spacing={1}
  //       alignItems="center"
  //       justifyContent="space-between"
  //       sx={{
  //         p: 1,
  //         minHeight: {
  //           xs: 155,
  //           sm: 255,
  //         },
  //       }}
  //     >
  //       <Grid
  //         xs={6}
  //         sm={12}
  //         sx={{
  //           minHeight: {
  //             xs: 155,
  //             sm: 161,
  //           },
  //           p: 1,
  //           mt: {
  //             xs: 0,
  //             sm: 0,
  //           },
  //         }}
  //       >
  //         <Typography
  //           variant="body2"
  //           color="text.primary"
  //           sx={{ fontSize: 18 }}
  //         >
  //           {showName}
  //         </Typography>
  //         <Typography variant="body2" color="text.primary">
  //           {episodeName}
  //         </Typography>
  //         <Typography variant="body2" color="text.primary">
  //           {showTypeAndNumber}
  //         </Typography>
  //         <Typography variant="body2" color="text.primary">
  //           {props.show.dateWatched &&
  //             new Date(props.show.dateWatched).toLocaleDateString()}
  //         </Typography>
  //         <Typography variant="body2" color="text.primary">
  //           {runtime}
  //         </Typography>
  //         {isAMC && (
  //           <>
  //             <Typography variant="body2" color="text.r">
  //               {formatter.format(totalPurchases)}
  //             </Typography>
  //           </>
  //         )}
  //       </Grid>
  //       <Grid xs={6} sm={12}>
  //         <Stack direction="column" spacing={2}>
  //           <Stack
  //             direction="row"
  //             spacing={1}
  //             sx={{ justifyContent: 'center' }}
  //           >
  //             <IconButton
  //               aria-label="Edit"
  //               sx={sxButton}
  //               onClick={() => {
  //                 props.onSelectShow(props.show);
  //               }}
  //             >
  //               <EditIcon style={{ color: 'cornflowerblue' }} />
  //             </IconButton>
  //             {isTV && (
  //               <IconButton
  //                 aria-label="Add Next Episode"
  //                 sx={sxButton}
  //                 onClick={() => {
  //                   props.onAddNextEpisode(props.show.showId);
  //                 }}
  //               >
  //                 <AddIcon style={{ color: 'lightgreen' }} />
  //               </IconButton>
  //             )}
  //             <IconButton
  //               aria-label="Delete"
  //               sx={sxButton}
  //               onClick={() => {
  //                 props.onDeleteShow(props.show.showId);
  //               }}
  //             >
  //               <DeleteIcon style={{ color: 'red' }} />
  //             </IconButton>
  //           </Stack>
  //           {isTV && (
  //             <Stack
  //               direction="row"
  //               spacing={1}
  //               sx={{ justifyContent: 'center' }}
  //             >
  //               <IconButton
  //                 aria-label="Subtract One Day"
  //                 sx={sxButton}
  //                 onClick={() => {
  //                   props.onSubtractOneDay(props.show.showId);
  //                 }}
  //               >
  //                 <FastRewindIcon style={{ color: 'yellow' }} />
  //               </IconButton>
  //               <IconButton
  //                 aria-label="Add One Day"
  //                 sx={sxButton}
  //                 onClick={() => {
  //                   props.onAddOneDay(props.show.showId);
  //                 }}
  //               >
  //                 <FastForewardIcon style={{ color: 'cyan' }} />
  //               </IconButton>
  //               <IconButton
  //                 aria-label="Binge"
  //                 sx={sxButton}
  //                 onClick={() => {
  //                   props.onBingeWatchShow(props.show);
  //                 }}
  //               >
  //                 <TrackChangesIcon style={{ color: 'orange' }} />
  //               </IconButton>
  //             </Stack>
  //           )}
  //         </Stack>
  //       </Grid>
  //     </Grid>
  //   </Card>
  // );
};
