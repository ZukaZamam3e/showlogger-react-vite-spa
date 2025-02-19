export interface WatchedModel {
  watchedId: number;
  infoId: number;
  userId: number;
  infoType: number;
  infoTypeIdZ?: string;
  name: string;
  dateWatched?: Date;
  infoUrl: string;
  backdropUrl: string;

  api?: number;
  type?: number;
  id?: string;
}

export const createNewWatched = () => {
  const newWhatsNextSub: WatchedModel = {
    watchedId: -1,
    infoId: -1,
    userId: -1,
    infoType: -1,
    name: '',
    dateWatched: undefined,
    infoUrl: '',
    backdropUrl: '',
  };

  return newWhatsNextSub;
};
