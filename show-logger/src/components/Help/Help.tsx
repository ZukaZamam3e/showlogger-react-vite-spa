import { SLTab } from '../Common/SLTab';
import { BooksHelp } from './Books/BookHelp';
import { FriendsHelp } from './Friends/FriendsHelp';
import { ShowsHelp } from './Shows/ShowsHelp';

export const Help = () => {
  const tabs = [
    {
      id: 0,
      label: 'Shows',
      content: <ShowsHelp />,
    },
    {
      id: 1,
      label: 'Books',
      content: <BooksHelp />,
    },
    {
      id: 2,
      label: 'Friends',
      content: <FriendsHelp />,
    },
  ];

  return <SLTab tabs={tabs} />;
};
