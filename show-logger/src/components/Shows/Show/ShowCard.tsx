import { ShowModel } from '../../../models/ShowModel';
import { TvCard } from '../Common/TvCard';
import { MovieCard } from '../Common/MovieCard';
import { AmcCard } from '../Common/AmcCard';

interface ShowCardProps {
  show: ShowModel;
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
        onSelectShow={props.onSelectShow}
        onDeleteShow={props.onDeleteShow}
      />
    );
  } else if (isAMC) {
    body = (
      <AmcCard
        show={props.show}
        onSelectShow={props.onSelectShow}
        onDeleteShow={props.onDeleteShow}
      />
    );
  }

  return body;
};
