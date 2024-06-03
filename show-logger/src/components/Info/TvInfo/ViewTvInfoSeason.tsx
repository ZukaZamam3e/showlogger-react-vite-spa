import { useDispatch } from 'react-redux';
import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showErrors } from '../../../slices/errorsSlice';
import { TvInfoSeasonModel } from '../../../models/TvInfoSeasonModel';
import { TvEpisodeInfoModel } from '../../../models/TvEpisodeInfoModel';
import { protectedResources } from '../../../config/apiConfig';

interface ViewTvInfoSeasonProps {
  season: TvInfoSeasonModel;
}

export const ViewTvInfoSeason = (props: ViewTvInfoSeasonProps) => {
  const dispatch = useDispatch();
  const { getData, postData } = useFetch();
  const [episodes, setEpisodes] = useState<TvEpisodeInfoModel[]>([]);

  const get = async (search: string) => {
    dispatch(startLoading());
    await getData(
      `${protectedResources.oaprojectsApi.tvInfoEndpoint}/getepisodes?tvInfoId=${props.season.tvInfoId}&seasonNumber=${props.season.seasonNumber}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setEpisodes(json.model.episodes);
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  useEffect(() => {
    get('');
  }, []);

  return <>{props.season.seasonName}</>;
};
