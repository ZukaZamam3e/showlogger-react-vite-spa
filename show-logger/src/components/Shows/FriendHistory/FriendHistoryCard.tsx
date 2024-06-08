import { ShowModel } from '../../../models/ShowModel';
import { TvCard } from '../Common/TvCard';
import { MovieCard } from '../Common/MovieCard';
import { AmcCard } from '../Common/AmcCard';

interface FriendHistoryCardProps {
  show: ShowModel;
  name: string;
}

export const FriendHistoryCard = (props: FriendHistoryCardProps) => {
  const isTV = props.show.showTypeId === 1000;
  const isMovie = props.show.showTypeId === 1001;
  const isAMC = props.show.showTypeId === 1002;

  let body;

  if (isTV) {
    body = (
      <TvCard
        show={props.show}
        name={props.name}
        hasButtons={false}
        onSelectShow={() => {}}
        onAddNextEpisode={() => {}}
        onDeleteShow={() => {}}
        onAddOneDay={() => {}}
        onSubtractOneDay={() => {}}
        onBingeWatchShow={() => {}}
      />
    );
  } else if (isMovie) {
    body = (
      <MovieCard
        show={props.show}
        name={props.name}
        hasButtons={false}
        onSelectShow={() => {}}
        onDeleteShow={() => {}}
      />
    );
  } else if (isAMC) {
    body = (
      <AmcCard
        show={props.show}
        name={props.name}
        hasButtons={false}
        onSelectShow={() => {}}
        onDeleteShow={() => {}}
      />
    );
  }

  return body;
};
