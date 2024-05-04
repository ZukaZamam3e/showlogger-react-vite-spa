export interface MovieStatModel {
  userId: number;
  movieName: string;
  showId: number;
  showTypeId: number;
  showTypeIdZ: string;
  dateWatched: Date;
  alistTicketAmt: number;
  ticketAmt: number;
  purchaseAmt: number;
  benefitsAmt: number;
  rewardsAmt: number;
  totalAmt: number;
  infoId?: number;
  infoBackdropUrl?: string;
  infoUrl?: string;
}
