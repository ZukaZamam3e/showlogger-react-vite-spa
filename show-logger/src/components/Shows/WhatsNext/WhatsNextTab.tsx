import { ReactNode, useEffect, useState } from 'react';
import { whatsNextApi } from '../../../api/whatsNextApi';
import { WhatsNextShowModel } from '../../../models/WhatsNextShowModel';
import { ManageSubs } from './ManageSubs';
import { Fab } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { placements } from '../../../config/placementConfig';
import { List } from '../../Common/List';
import { WhatsNextShowCard } from './WhatsNextShowCard';
import { WhatsNextEpisodeModel } from '../../../models/WhatsNextEpisodeModel';
import { WhatsNextEpisodes } from './WhatsNextEpisodes';
import CancelIcon from '@mui/icons-material/Cancel';

export const WhatsNextTab = () => {
  const { loadWhatsNext, getWhatsNext, watchEpisode } = whatsNextApi();
  const [whatsNextShows, setWhatsNextShows] = useState<WhatsNextShowModel[]>(
    [],
  );
  const [whatsNextShowsCount, setWhatsNextShowsCount] = useState<number>(0);
  const [episodes, setEpisodes] = useState<WhatsNextEpisodeModel[]>([]);
  const [hideListButton, setHideListButton] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [managing, setManaging] = useState(false);

  const take = 12;

  const load = async () => {
    const { data, count } = await loadWhatsNext(take);
    setWhatsNextShows(data);
    setWhatsNextShowsCount(count);
  };

  const get = async (page: number, search: string) => {
    const { data, count } = await getWhatsNext(page, take, search);
    setWhatsNextShows(data);
    setWhatsNextShowsCount(count);
  };

  useEffect(() => {
    load();
  }, []);

  const handleManageSubs = () => {
    setManaging(true);
  };

  const handleCancelManageSubs = () => {
    setManaging(false);
    get(0, '');
  };

  const handleToggleSearch = () => {
    setHideListButton(prev => !prev);
  };

  const handleSelectShow = (show: WhatsNextShowModel) => {
    setEpisodes(show.episodes);
  };

  const handleCancelSelectedShow = () => {
    setEpisodes([]);
  };

  const handleWatchEpisode = async (episode: WhatsNextEpisodeModel) => {
    const showId: number = await watchEpisode(
      episode.tvEpisodeInfoId,
      new Date(),
    );

    if (showId > 0) {
      const updatedEpisodes = episodes.filter(
        m => m.tvEpisodeInfoId != episode.tvEpisodeInfoId,
      );
      setEpisodes(updatedEpisodes);

      if (updatedEpisodes.length == 0) {
        get(0, '');
      }
    }
  };

  const sxBody = {
    display: !managing ? 'initial' : 'none',
  };

  const manageSubscriptions = managing && (
    <ManageSubs onCancleManageSub={handleCancelManageSubs} />
  );

  let body: ReactNode = null;
  if (episodes.length == 0) {
    body = (
      <div style={sxBody}>
        {!hideListButton && (
          <Fab
            sx={{
              position: 'fixed',
              bottom: placements.fab.secondIconBottom,
              right: placements.fab.right,
            }}
            color="success"
            aria-label="manage"
            onClick={handleManageSubs}
          >
            <ListIcon />
          </Fab>
        )}
        <List
          count={whatsNextShowsCount}
          onGet={get}
          clearSearch={clearSearch}
          take={take}
          onToggleSearch={handleToggleSearch}
        >
          {whatsNextShows.map((show: WhatsNextShowModel) => (
            <WhatsNextShowCard show={show} onSelectShow={handleSelectShow} />
          ))}
        </List>
      </div>
    );
  } else {
    body = (
      <>
        <WhatsNextEpisodes
          episodes={episodes}
          onWatchEpisode={handleWatchEpisode}
        />
        <Fab
          sx={{
            position: 'fixed',
            bottom: placements.fab.secondIconBottom,
            right: placements.fab.right,
          }}
          color="error"
          aria-label="cancel"
          onClick={handleCancelSelectedShow}
        >
          <CancelIcon />
        </Fab>
      </>
    );
  }

  return (
    <>
      {body}
      {manageSubscriptions}
    </>
  );
};
