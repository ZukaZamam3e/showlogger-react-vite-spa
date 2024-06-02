import { BookTab } from './Book/BookTab';
import { SLTab } from '../Common/SLTab';
import { BookFriendHistoryTab } from './FriendHistory/BookFriendHistoryTab';
import { BookYearStatsTab } from './YearStats/BookYearStatsTab';

export const Books = () => {
  const tabs = [
    {
      id: 0,
      label: 'Books',
      content: <BookTab />,
    },
    {
      id: 1,
      label: 'Friends',
      content: <BookFriendHistoryTab />,
    },
    {
      id: 2,
      label: 'Year Stats',
      content: <BookYearStatsTab />,
    },
  ];

  return <SLTab tabs={tabs} />;
};
