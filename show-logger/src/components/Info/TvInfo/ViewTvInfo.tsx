import { Box, Button, Fab, Paper } from '@mui/material';
import { placements } from '../../../config/placementConfig';
import { TvInfoModel } from '../../../models/TvInfoModel';
import CancelIcon from '@mui/icons-material/Cancel';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { SLTextField } from '../../Common/SLTextField';
import {
  TvInfoSeasonModel,
  createNewSeason,
} from '../../../models/TvInfoSeasonModel';
import { useState } from 'react';
import { ViewTvInfoSeason } from './ViewTvInfoSeason';

interface SeasonButtonProps {
  season: TvInfoSeasonModel;
  onSelectSeason: (season: TvInfoSeasonModel) => void;
}

export const SeasonButton = (props: SeasonButtonProps) => {
  let seasonName = props.season.seasonName;

  if (
    seasonName !== props.season.seasonNumberZ &&
    seasonName !== 'Specials' &&
    seasonName !== 'Miniseries'
  ) {
    seasonName += ` (${props.season.seasonNumberZ})`;
  }

  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={() => props.onSelectSeason(props.season)}
    >
      {seasonName} - {props.season.episodeCount} episodes
    </Button>
  );
};

interface ViewTvInfoProps {
  tvInfo: TvInfoModel;
  onCancelSelectedTvInfo: () => void;
}

export const ViewTvInfo = (props: ViewTvInfoProps) => {
  const [viewingSeason, setViewingSeason] = useState({
    show: false,
    season: createNewSeason(),
  });

  const handleSelectSeason = (season: TvInfoSeasonModel) => {
    setViewingSeason({
      show: true,
      season: season,
    });
  };

  const handleCancelSelectedSeason = () => {
    setViewingSeason({
      show: false,
      season: createNewSeason(),
    });
  };

  const disabledStyle = {
    '& .MuiInputBase-input.Mui-disabled': {
      WebkitTextFillColor: '#FFFFFF',
    },
    '& .MuiInputLabel-root.Mui-disabled': {
      WebkitTextFillColor: '#FFFFFF',
    },
  };

  const sxBody = {
    display: !viewingSeason.show ? 'initial' : 'none',
  };

  const season = viewingSeason.show && (
    <ViewTvInfoSeason
      season={viewingSeason.season}
      onCancelSelectedSeason={handleCancelSelectedSeason}
    />
  );

  const body = (
    <div style={sxBody}>
      <Box
        sx={{
          paddingBottom: {
            xs: '185px',
            sm: '185px',
            md: '52px',
            lg: '52px',
          },
        }}
      >
        <Paper
          sx={{
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: 'white',
            borderRadius: 3,
            m: 2,
            padding: 3,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            {/* <Grid xs={12}>
              <DatePicker
                slotProps={{ textField: { fullWidth: true } }}
                label="Last Updated"
                value={dayjs(props.tvInfo.lastUpdated)}
              />
            </Grid> */}
            <Grid xs={12}>
              <SLTextField
                fullWidth
                name="showName"
                label="Name"
                defaultValue={props.tvInfo.showName}
                disabled
                sx={disabledStyle}
              />
            </Grid>
            <Grid xs={12}>
              <SLTextField
                fullWidth
                name="showOverview"
                label="Overview"
                multiline
                defaultValue={props.tvInfo.showOverview}
                disabled
                sx={disabledStyle}
              />
            </Grid>
            <Grid xs={12}>
              <DatePicker
                slotProps={{ textField: { fullWidth: true, color: 'primary' } }}
                label="Last Data Refresh"
                value={dayjs(props.tvInfo.lastDataRefresh)}
                disabled
                sx={disabledStyle}
              />
            </Grid>
            {props.tvInfo.seasons.map((season: TvInfoSeasonModel) => (
              <Grid xs={12} key={season.seasonNumber}>
                <SeasonButton
                  season={season}
                  onSelectSeason={handleSelectSeason}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
      <Fab
        sx={{
          position: 'fixed',
          bottom: placements.fab.secondIconBottom,
          right: placements.fab.right,
        }}
        color="error"
        aria-label="add"
        onClick={props.onCancelSelectedTvInfo}
      >
        <CancelIcon />
      </Fab>
    </div>
  );

  return (
    <>
      {body}
      {season}
    </>
  );
};
