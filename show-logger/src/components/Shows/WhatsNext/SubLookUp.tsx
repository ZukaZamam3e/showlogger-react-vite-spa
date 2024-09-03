import { useState } from 'react';
import { SearchResultsModel } from '../../../models/SearchResultsModel';
import { SearchApi } from '../../Search/SearchApi';
import { SearchCard } from '../../Search/SearchCard';
import { SLIconButton } from '../../Common/SLIconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export interface SubLookUpProps {
  onSelectShow: (searchResult: SearchResultsModel) => void;
}

export const SubLookUp = (props: SubLookUpProps) => {
  const [searchResults, setSearchResults] = useState<SearchResultsModel[]>([]);

  return (
    <SearchApi onSetSearchResults={setSearchResults}>
      {searchResults.map((searchResult: SearchResultsModel) => (
        <SearchCard searchResult={searchResult}>
          <SLIconButton
            aria-label="Watch"
            onClick={() => props.onSelectShow(searchResult)}
          >
            <CalendarMonthIcon />
          </SLIconButton>
        </SearchCard>
      ))}
    </SearchApi>
  );
};
