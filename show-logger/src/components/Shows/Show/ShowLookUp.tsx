import { useState } from 'react';
import { SearchResultsModel } from '../../../models/SearchResultsModel';
import { SearchApi } from '../../Search/SearchApi';
import { SearchCard } from '../../Search/SearchCard';
import { SLIconButton } from '../../Common/SLIconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

export interface ShowLookUpProps {
  onWatchResult: (searchResult: SearchResultsModel, watchlist: boolean) => void;
}

export const ShowLookUp = (props: ShowLookUpProps) => {
  const [searchResults, setSearchResults] = useState<SearchResultsModel[]>([]);

  return (
    <SearchApi onSetSearchResults={setSearchResults}>
      {searchResults.map((searchResult: SearchResultsModel) => (
        <SearchCard searchResult={searchResult}>
          <SLIconButton
            aria-label="Watch"
            onClick={() => props.onWatchResult(searchResult, false)}
          >
            <VisibilityIcon />
          </SLIconButton>
          <SLIconButton
            aria-label="Watchlist"
            onClick={() => props.onWatchResult(searchResult, true)}
          >
            <QueryBuilderIcon />
          </SLIconButton>
        </SearchCard>
      ))}
    </SearchApi>
  );
};
