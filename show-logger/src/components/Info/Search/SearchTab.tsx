import { useState } from 'react';
import { SearchResultsModel } from '../../../models/SearchResultsModel';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../../slices/popupSlice';
import { SearchApi } from '../../Search/SearchApi';
import { SLIconButton } from '../../Common/SLIconButton';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { SearchCard } from '../../Search/SearchCard';
import { SearchShowModel } from '../../../models/SearchShowModel';
import { infoApi } from '../../../api/infoApi';
import { DownloadInfoModel } from '../../../models/DownloadInfoModel';

interface SearchTabProps {
  searchShow?: SearchShowModel | null;
}

export const SearchTab = (props: SearchTabProps) => {
  const { downloadInfo } = infoApi();
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState<SearchResultsModel[]>([]);

  const handleDownloadClick = async (searchResult: SearchResultsModel) => {
    const info: DownloadInfoModel = await downloadInfo(searchResult);
    if (info != null) {
      dispatch(
        showMessage({
          show: true,
          message: `${info.showName} has been added.`,
        }),
      );
    }
  };

  const handleContentCopyClick = (searchResult: SearchResultsModel) => {
    navigator.clipboard.writeText(searchResult.name);
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
          <SLIconButton
            aria-label="Copy Name"
            onClick={() => handleContentCopyClick(searchResult)}
          >
            <ContentCopyIcon />
          </SLIconButton>
        </SearchCard>
      ))}
    </SearchApi>
  );
};
