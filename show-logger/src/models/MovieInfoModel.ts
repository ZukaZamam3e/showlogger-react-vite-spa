export interface MovieInfoModel {
  movieInfoId: number;
  movieName: string;
  movieOverview: string;
  apiType?: number;
  apiId?: string;
  runtime?: number;
  airDate?: Date;
  lastDataRefresh: Date;
  lastUpdated: Date;
  posterUrl?: string;
  backdropUrl?: string;
  infoUrl?: string;
}

export const createNewMovieInfo = () => {
  const newMovieInfo: MovieInfoModel = {
    movieInfoId: -1,
    movieName: '',
    movieOverview: '',
    lastDataRefresh: new Date(),
    lastUpdated: new Date(),
  };

  return newMovieInfo;
};
