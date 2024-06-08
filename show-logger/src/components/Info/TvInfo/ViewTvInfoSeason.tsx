import { useDispatch } from 'react-redux';
import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showErrors } from '../../../slices/errorsSlice';
import { TvInfoSeasonModel } from '../../../models/TvInfoSeasonModel';
import { TvEpisodeInfoModel } from '../../../models/TvEpisodeInfoModel';
import { protectedResources } from '../../../config/apiConfig';
import { Fab } from '@mui/material';
import { placements } from '../../../config/placementConfig';
import CancelIcon from '@mui/icons-material/Cancel';
import { TvInfoSeasonCard } from './TvInfoSeasonCard';

interface ViewTvInfoSeasonProps {
  season: TvInfoSeasonModel;
  onCancelSelectedSeason: () => void;
}

export const ViewTvInfoSeason = (props: ViewTvInfoSeasonProps) => {
  const dispatch = useDispatch();
  const { getData, postData } = useFetch();
  const [episodes, setEpisodes] = useState<TvEpisodeInfoModel[]>([]);

  const get = async (search: string) => {
    dispatch(startLoading());
    await getData(
      `${protectedResources.oaprojectsApi.tvInfoEndpoint}/getepisodes?tvInfoId=${props.season.tvInfoId}&seasonNumber=${props.season.seasonNumber}&search=${search}&take=${props.season.episodeCount}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setEpisodes(json.model.tvEpisodeInfos);
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .finally(() => {
        dispatch(stopLoading());
      });
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
