import { YearStatDataModel } from './YearStatDataModel';

export interface YearStatModel {
  userId: number;
  name: string;
  year: number;
  tvCnt: number;
  tvNotTrackedCnt: number;
  tvRuntime?: number;
  tvRuntimeZ: string;
  tvStats: string;
  moviesCnt: number;
  moviesNotTrackedCnt: number;
  moviesRuntime?: number;
  moviesRuntimeZ: string;
  movieStats: number;
  amcCnt: number;
  amcNotTrackedCnt: number;
  amcRuntime?: number;
  amcRuntimeZ: string;
  amcStats: string;
  aListMembership: number;
  aListTickets: number;
  amcPurchases: number;

  data: YearStatDataModel[];
}
