export interface TransactionModel {
  transactionId: number;
  transactionTypeId: number;
  transactionTypeIdZ?: string;
  item: string;
  costAmt: number;
  quantity: number;
  transactionNotes?: string;

  transactionDate?: Date;

  deleteTransaction: boolean;
}

export const createNewTransaction = () => {
  const newShow: TransactionModel = {
    transactionId: -1,
    transactionDate: new Date(),
    transactionTypeId: 2003,
    costAmt: 0,
    item: '',
    quantity: 1,
    deleteTransaction: false,
  };

  return newShow;
};
