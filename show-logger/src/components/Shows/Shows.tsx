import { ShowsTab } from './Show/ShowsTab';
import { TvStatsTab } from './TvStats/TvStatsTab';
import { MovieStatsTab } from './MovieStats/MovieStatsTab';
import { YearStatsTab } from './YearStats/YearStatsTab';
import { WatchListTab } from './WatchList/WatchListTab';
import { FriendHistoryTab } from './FriendHistory/FriendHistoryTab';
import { AmcTab } from './Amc/AmcTab';
import { SLTab } from '../Common/SLTab';
import { WhatsNextTab } from './WhatsNext/WhatsNextTab';

export const Shows = () => {
  const tabs = [
    {
      id: 0,
      label: 'Shows',
      content: <ShowsTab />,
    },
    {
      id: 1,
      label: 'TV Stats',
      content: <TvStatsTab />,
    },
    {
      id: 2,
      label: 'Whats Next',
      content: <WhatsNextTab />,
    },
    {
      id: 3,
      label: 'Movie Stats',
      content: <MovieStatsTab />,
    },
    {
      id: 4,
      label: 'Friends',
      content: <FriendHistoryTab />,
    },
    {
      id: 5,
      label: 'Year Stats',
      content: <YearStatsTab />,
    },
    {
      id: 6,
      label: 'Watchlist',
      content: <WatchListTab />,
    },
    {
      id: 7,
      label: 'AMC',
      content: <AmcTab />,
    },
  ];

  return <SLTab tabs={tabs} />;
};
