export interface TvStatModel {
  userId: number;
  showId: number;
  showName: string;
  episodesWatched: number;
  startingSeasonNumber?: number;
  startingEpisodeNumber?: number;
  startingWatched: string;
  latestSeasonNumber?: number;
  latestEpisodeNumber?: number;
  latestWatched: string;
  watched: string;
  firstWatched: Date;
  lastWatched: Date;
  episodesPerDay: number;
  daysSinceStarting: number;
  infoId?: number;
  infoUrl?: string;
  infoBackdropUrl?: string;
  nextEpisodeInfoId?: number;
  nextEpisodeName?: string;
  nextSeasonNumber?: number;
  nextEpisodeNumber?: number;
  nextInfoUrl?: string;
  nextAirDate?: Date;
  episodesLeft?: number;
  nextWatched: string;
}
