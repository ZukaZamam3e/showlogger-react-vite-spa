import { TransactionItemModel } from './TransactionItemModel';
import { TransactionModel } from './TransactionModel';

export interface AddWatchFromSearchModel {
  api?: number;
  type?: number;
  id?: string;
  showName?: string;
  showTypeId?: number;
  seasonNumber?: number;
  episodeNumber?: number;
  dateWatched?: Date;
  showNotes?: string;
  restartBinge: boolean;

  transactions?: TransactionModel[];

  dateAdded?: Date;
}
