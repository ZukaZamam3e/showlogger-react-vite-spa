import { SLTab } from '../Common/SLTab';
import { MovieInfoTab } from './MovieInfo/MovieInfoTab';
import { SearchTab } from './Search/SearchTab';
import { TvInfoTab } from './TvInfo/TvInfoTab';
import { UnlinkedShowsTab } from './UnlinkedShows/UnlinkedShowsTab';

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
    {
      id: 2,
      label: 'Search',
      content: <SearchTab />,
    },
    {
      id: 3,
      label: 'Unlinked Shows',
      content: <UnlinkedShowsTab />,
    },
  ];

  return <SLTab tabs={tabs} />;
};
