import { BookYearStatDataModel } from './BookYearStatDataModel';

export interface BookYearStatModel {
  userId: number;
  name: string;
  year: number;
  bookCnt: number;
  chapterCnt: number;
  pageCnt: number;
  totalDays: number;
  dayAvg: number;
  dayAvgZ: string;
  chapterAvg: number;
  chapterAvgZ: string;
  pageAvg: number;
  pageAvgZ: string;
  monthAvg: number;
  monthAvgZ: string;

  data: BookYearStatDataModel[];
}
