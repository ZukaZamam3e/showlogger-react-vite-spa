import { useEffect, useState } from 'react';
import { TransactionCard } from './TransactionCard';
import {
  TransactionModel,
  createNewTransaction,
} from '../../../models/TransactionModel';
import { List } from '../../Common/List';
import { placements } from '../../../config/placementConfig';
import AddIcon from '@mui/icons-material/Add';
import { CodeValueModel } from '../../../models/CodeValueModel';
import { EditAmcTransaction } from './EditAmcTransaction';
import { TransactionItemModel } from '../../../models/TransactionItemModel';
import { useSelector } from 'react-redux';
import { Fab } from '@mui/material';
import { transactionApi } from '../../../api/transactionApi';

export const AmcTab = () => {
  const {
    loadTransaction,
    getTransaction,
    saveTransaction,
    deleteTransaction,
  } = transactionApi();
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [transactionTypeIds, setTransactionTypeIds] = useState<
    CodeValueModel[]
  >([]);
  const [transactionItems, setTransactionItems] = useState<
    TransactionItemModel[]
  >([]);
  const [clearSearch, setClearSearch] = useState(false);
  const [hideAddButton, setHideAddButton] = useState(false);
  const isMobile = useSelector((state: any) => state.isMobile.value);

  const [take, setTake] = useState(isMobile ? 12 : 24);

  const [editing, setEditing] = useState({
    show: false,
    editingTransaction: createNewTransaction(),
  });

  useEffect(() => {
    setTake(isMobile ? 12 : 24);
  }, [isMobile]);

  const load = async () => {
    const { data, count, transactionTypeIds, items } =
      await loadTransaction(take);
    setTransactions(data);
    setTransactionCount(count);
    setTransactionTypeIds(transactionTypeIds);
    setTransactionItems(items);
  };

  const get = async (page: number, search: string) => {
    const { data, count } = await getTransaction(page, take, search);
    setTransactions(data);
    setTransactionCount(count);
  };

  const handleTransactionSave = async (transaction: TransactionModel) => {
    setClearSearch(prev => !prev);
    const updatedTransaction = await saveTransaction(transaction);

    if (updatedTransaction != null) {
      handleCancelSelectedTransaction();
      await get(0, '');
    }
  };

  const handleDeleteTransaction = async (transactionId: number) => {
    setClearSearch(prev => !prev);
    const success = await deleteTransaction(transactionId);

    if (success) {
      await get(0, '');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggleSearch = () => {
    setHideAddButton(prev => !prev);
  };

  const handleSelectTransaction = (transaction: TransactionModel) => {
    setEditing({ show: true, editingTransaction: transaction });
  };

  const handleCancelSelectedTransaction = () => {
    setEditing({ show: false, editingTransaction: createNewTransaction() });
  };

  const handleAddNew = () => {
    setEditing({ show: true, editingTransaction: createNewTransaction() });
  };

  const sxBody = {
    display: !editing.show ? 'initial' : 'none',
  };

  const editTransaction = editing.show && (
    <EditAmcTransaction
      transaction={editing.editingTransaction}
      transactionTypeIds={transactionTypeIds}
      transactionItems={transactionItems}
      onTransactionSave={handleTransactionSave}
      onCancelSelectedTransaction={handleCancelSelectedTransaction}
    />
  );

  const body = (
    <div style={sxBody}>
      {!hideAddButton && (
        <Fab
          sx={{
            position: 'fixed',
            bottom: placements.fab.secondIconBottom,
            right: placements.fab.right,
          }}
          color="success"
          aria-label="add"
          onClick={handleAddNew}
        >
          <AddIcon />
        </Fab>
      )}
      <List
        count={transactionCount}
        onGet={get}
        clearSearch={clearSearch}
        onToggleSearch={handleToggleSearch}
        take={take}
      >
        {transactions.map((transaction: TransactionModel) => (
          <TransactionCard
            key={transaction.transactionId}
            transaction={transaction}
            onSelectTransaction={handleSelectTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        ))}
      </List>
    </div>
  );

  return (
    <>
      {body}
      {editTransaction}
    </>
  );
};
