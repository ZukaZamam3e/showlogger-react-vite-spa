export interface WatchListModel {
  watchlistId: number;
  showName?: string;
  showTypeId?: number;
  showTypeIdZ?: string;
  seasonNumber?: number;
  episodeNumber?: number;
  dateAdded?: Date;
  showNotes?: string;
  infoId?: number;

  episodeName?: string;
  runtime?: number;
  runtimeZ?: string;
  imageUrl?: string;
  infoUrl?: string;
  seasonEpisode?: string;
  showNameZ?: string;
}

export const createNewWatchList = () => {
  const newWatchList: WatchListModel = {
    watchlistId: -1,
    dateAdded: new Date(),
    showTypeId: 1000,
    seasonNumber: 1,
    episodeNumber: 1,
  };

  return newWatchList;
};
