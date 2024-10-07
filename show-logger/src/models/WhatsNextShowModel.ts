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
  nextAirDate: Date;
  nextAirDateDay: string;
  nextAirDateCount: number;
  episodes: WhatsNextEpisodeModel[];
}
