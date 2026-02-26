import { useState } from 'react';
import { SearchResultsModel } from '../../../models/SearchResultsModel';
import { SearchApi } from '../../Search/SearchApi';
import { SearchCard } from '../../Search/SearchCard';
import { SLIconButton } from '../../Common/SLIconButton';
import CheckIcon from '@mui/icons-material/Check';
import { BatchSearchApi } from '../../Search/BatchSearchApi';

export interface WatchedLookUpProps {
  onSelectShow: (searchResult: SearchResultsModel) => void;
}

export const WatchedLookUp = (props: WatchedLookUpProps) => {
  const [searchResults, setSearchResults] = useState<SearchResultsModel[]>([]);

  const tvShows = searchResults.filter(result => result.type === 0);
  const movies = searchResults.filter(result => result.type === 1);

  return (
    <BatchSearchApi onSetSearchResults={setSearchResults}>
      {tvShows.length > 0 && (
        <>
          <div style={{ gridColumn: '1/-1' }}>
            <h1>TV Shows</h1>
          </div>
          {tvShows.map((searchResult: SearchResultsModel) => (
            <SearchCard searchResult={searchResult}>
              <SLIconButton
                aria-label="Watched"
                onClick={() => props.onSelectShow(searchResult)}
              >
                <CheckIcon />
              </SLIconButton>
            </SearchCard>
          ))}
          <div style={{ gridColumn: '1/-1' }}>
            <hr />
          </div>
        </>
      )}{' '}
      {movies.length > 0 && (
        <>
          <div style={{ gridColumn: '1/-1' }}>
            <h1>Movies</h1>
          </div>
          {movies.map((searchResult: SearchResultsModel) => (
            <SearchCard searchResult={searchResult}>
              <SLIconButton
                aria-label="Watched"
                onClick={() => props.onSelectShow(searchResult)}
              >
                <CheckIcon />
              </SLIconButton>
            </SearchCard>
          ))}
          <div style={{ gridColumn: '1/-1' }}>
            <hr />
          </div>
        </>
      )}
    </BatchSearchApi>
  );
};
