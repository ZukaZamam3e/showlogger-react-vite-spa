import { useState } from 'react';
import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
import { protectedResources } from '../../../config/apiConfig';
import { SearchResultsModel } from '../../../models/SearchResultsModel';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showMessage } from '../../../slices/popupSlice';
import { SearchApi } from '../../Search/SearchApi';
import { SLIconButton } from '../../Common/SLIconButton';
import DownloadIcon from '@mui/icons-material/Download';
import { SearchCard } from '../../Search/SearchCard';
import { SearchShowModel } from '../../../models/SearchShowModel';

interface SearchTabProps {
  searchShow?: SearchShowModel;
}

export const SearchTab = (props: SearchTabProps) => {
  const dispatch = useDispatch();
  const { postData } = useFetch();
  const [searchResults, setSearchResults] = useState<SearchResultsModel[]>([]);

  const handleDownloadClick = async (searchResult: SearchResultsModel) => {
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.infoEndpoint}/downloadinfo`,
      {
        api: searchResult.api,
        type: searchResult.type,
        id: searchResult.id,
      },
    )
      .then(json =>
        dispatch(
          showMessage({
            show: true,
            message: `${json.model.showName} has been added.`,
          }),
        ),
      )
      .catch(() => {})
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  return (
    <SearchApi
      onSetSearchResults={setSearchResults}
      searchShow={props.searchShow}
    >
      {searchResults.map((searchResult: SearchResultsModel) => (
        <SearchCard searchResult={searchResult}>
          <SLIconButton
            aria-label="Download"
            onClick={() => handleDownloadClick(searchResult)}
          >
            <DownloadIcon />
          </SLIconButton>
        </SearchCard>
      ))}
    </SearchApi>
  );
};
