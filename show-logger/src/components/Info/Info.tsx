import { SLTab } from '../Common/SLTab';
import { MovieInfoTab } from './MovieInfo/MovieInfoTab';
import { TvInfoTab } from './TvInfo/TvInfoTab';

export const Info = () => {
  const tabs = [
    {
      id: 0,
      label: 'TV Info',
      content: <TvInfoTab />,
    },
    {
      id: 1,
      label: 'Movie Info',
      content: <MovieInfoTab />,
    },
  ];

  return <SLTab tabs={tabs} />;
};
