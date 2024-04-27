export interface TransactionModel {
    transactionId: number;
    transactionTypeId: number;
    transactionTypeIdZ?: string;
    item: string;
    costAmt: number;
    quantity: number;
    transactionNotes?: string;
    deleteTransaction: boolean;
}