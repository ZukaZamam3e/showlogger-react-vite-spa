import { useState } from 'react';
import { SearchShowModel } from '../../models/SearchShowModel';
import { SLTab } from '../Common/SLTab';
import { MovieInfoTab } from './MovieInfo/MovieInfoTab';
import { SearchTab } from './Search/SearchTab';
import { TvInfoTab } from './TvInfo/TvInfoTab';
import { UnlinkedShowsTab } from './UnlinkedShows/UnlinkedShowsTab';

export const Info = () => {
  const [changeToTab, setChangeToTab] = useState(-1);
  const [searchShow, setSearchShow] = useState<SearchShowModel>();
  const handleSearchShow = (searchShow: SearchShowModel) => {
    setSearchShow(searchShow);
    setChangeToTab(2);
  };

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
      content: <SearchTab searchShow={searchShow} />,
    },
    {
      id: 3,
      label: 'Unlinked Shows',
      content: <UnlinkedShowsTab onSearchShow={handleSearchShow} />,
    },
  ];

  return <SLTab tabs={tabs} changeToTab={changeToTab} />;
};
