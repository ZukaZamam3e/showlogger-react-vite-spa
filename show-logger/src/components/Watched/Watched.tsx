import { MoviesTab } from './Movies/MoviesTab';
import { TVTab } from './TV/TVTab';
import { SLTab } from '../Common/SLTab';

export const Watched = () => {
  const tabs = [
    {
      id: 0,
      label: 'TV',
      content: <TVTab />,
    },
    {
      id: 1,
      label: 'Movies',
      content: <MoviesTab />,
    },
  ];

  return <SLTab tabs={tabs} />;
};
