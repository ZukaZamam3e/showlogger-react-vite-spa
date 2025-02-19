import { useState } from 'react';
import { SearchResultsModel } from '../../../models/SearchResultsModel';
import { SearchApi } from '../../Search/SearchApi';
import { SearchCard } from '../../Search/SearchCard';
import { SLIconButton } from '../../Common/SLIconButton';
import CheckIcon from '@mui/icons-material/Check';

export interface WatchedLookUpProps {
  onSelectShow: (searchResult: SearchResultsModel) => void;
}

export const WatchedLookUp = (props: WatchedLookUpProps) => {
  const [searchResults, setSearchResults] = useState<SearchResultsModel[]>([]);

  return (
    <SearchApi onSetSearchResults={setSearchResults}>
      {searchResults.map((searchResult: SearchResultsModel) => (
        <SearchCard searchResult={searchResult}>
          <SLIconButton
            aria-label="Watched"
            onClick={() => props.onSelectShow(searchResult)}
          >
            <CheckIcon />
          </SLIconButton>
        </SearchCard>
      ))}
    </SearchApi>
  );
};
