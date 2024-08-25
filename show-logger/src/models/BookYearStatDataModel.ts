export interface BookYearStatDataModel {
  userId: number;
  year: number;
  month: number;
  bookName: string;
  startDate: Date;
  endDate: Date;
  chapters?: number;
  pages?: number;
}
