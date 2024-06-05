export interface TvInfoSeasonModel {
  tvInfoId: number;
  seasonNumber: number;
  seasonName: string;
  episodeCount: number;
  seasonNumberZ: string;
}

export const createNewSeason = () => {
  const newSeason: TvInfoSeasonModel = {
    tvInfoId: -1,
    seasonNumber: -1,
    seasonName: '',
    episodeCount: 0,
    seasonNumberZ: '',
  };

  return newSeason;
};
