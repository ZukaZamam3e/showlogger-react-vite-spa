import { WhatsNextEpisodeModel } from '../../../models/WhatsNextEpisodeModel';
import { List } from '../../Common/List';
import { WhatsNextEpisodeCard } from './WhatsNextEpisodeCard';

interface WhatsNextEpisodesProp {
  episodes: WhatsNextEpisodeModel[];
  onWatchEpisode: (episode: WhatsNextEpisodeModel) => void;
}

export const WhatsNextEpisodes = (props: WhatsNextEpisodesProp) => {
  return (
    <List
      count={props.episodes.length}
      take={props.episodes.length}
      hideSearch={true}
    >
      {props.episodes.map(episode => (
        <WhatsNextEpisodeCard
          episode={episode}
          onWatchEpisode={props.onWatchEpisode}
        />
      ))}
    </List>
  );
};
