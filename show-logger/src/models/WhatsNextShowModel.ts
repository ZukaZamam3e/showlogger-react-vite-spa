import { WhatsNextEpisodeModel } from './WhatsNextEpisodeModel';

export interface WhatsNextShowModel {
  whatsNextSubId: number;
  tvInfoId: number;
  showName: string;
  seasonStatus: string;
  seasonNumber: number;
  seasonName: string;
  startDate: number;
  endDate: number;
  posterUrl: string;
  backdropUrl: string;
  infoUrl: string;
  seasonUrl: string;
  status: string;
  daysLeft: number;
  episodes: WhatsNextEpisodeModel[];
}
