import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { TvInfoSeasonModel } from '../../../models/TvInfoSeasonModel';
import { TvEpisodeInfoModel } from '../../../models/TvEpisodeInfoModel';
import { Fab } from '@mui/material';
import { placements } from '../../../config/placementConfig';
import CancelIcon from '@mui/icons-material/Cancel';
import { TvInfoSeasonCard } from './TvInfoSeasonCard';
import { tvInfoApi } from '../../../api/tvInfoApi';

interface ViewTvInfoSeasonProps {
  season: TvInfoSeasonModel;
  onCancelSelectedSeason: () => void;
}

export const ViewTvInfoSeason = (props: ViewTvInfoSeasonProps) => {
  const { getTvInfoEpisodes } = tvInfoApi();
  const [episodes, setEpisodes] = useState<TvEpisodeInfoModel[]>([]);

  const get = async (search: string) => {
    let episodes: TvEpisodeInfoModel[] = await getTvInfoEpisodes(
      props.season.tvInfoId,
      props.season.seasonNumber,
      props.season.episodeCount,
      search,
    );
    setEpisodes(episodes);
  };

  useEffect(() => {
    get('');
  }, []);

  return (
    <>
      {props.season.seasonName}
      <hr />
      <List count={episodes.length} take={episodes.length}>
        {episodes.map(episode => (
          <TvInfoSeasonCard episode={episode} />
        ))}
      </List>

      <Fab
        sx={{
          position: 'fixed',
          bottom: placements.fab.secondIconBottom,
          right: placements.fab.right,
        }}
        color="error"
        aria-label="add"
        onClick={props.onCancelSelectedSeason}
      >
        <CancelIcon />
      </Fab>
    </>
  );
};
