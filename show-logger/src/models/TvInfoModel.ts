import { TvInfoSeasonModel } from './TvInfoSeasonModel';

export interface TvInfoModel {
  tvInfoId: number;
  showName: string;
  showOverview: string;
  apiType?: number;
  apiId?: string;
  lastDataRefresh: Date;
  lastUpdated: Date;
  posterUrl?: string;
  backdropUrl?: string;
  infoUrl?: string;
  status?: string;
  seasons: TvInfoSeasonModel[];
}

export const createNewTvInfo = () => {
  const newTvInfo: TvInfoModel = {
    tvInfoId: -1,
    showName: '',
    showOverview: '',
    lastDataRefresh: new Date(),
    lastUpdated: new Date(),
    seasons: [],
  };

  return newTvInfo;
};
