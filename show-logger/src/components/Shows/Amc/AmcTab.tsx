import { ReactNode, useEffect, useState } from 'react';
import { protectedResources } from '../../../config/apiConfig';
import { useFetch } from '../../../hooks/useFetchOAProjectsAPI';
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
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../../../slices/isLoadingSlice';
import { showErrors } from '../../../slices/errorsSlice';
import { Fab } from '@mui/material';

export const AmcTab = () => {
  const dispatch = useDispatch();
  const { getData, postData } = useFetch();
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
    dispatch(startLoading());
    await getData(
      `${protectedResources.oaprojectsApi.transactionEnpoint}/load?take=${take}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setTransactions(json.model.transactions);
          setTransactionCount(json.model.count);
          setTransactionTypeIds(json.model.transactionTypeIds);
          setTransactionItems(json.model.transactionItems);
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  const get = async (page: number, search: string) => {
    dispatch(startLoading());
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.transactionEnpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setTransactions(json.model.transactions);
          setTransactionCount(json.model.count);
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  const handleTransactionSave = async (transaction: TransactionModel) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());

    await postData(
      `${protectedResources.oaprojectsApi.transactionEnpoint}/save`,
      transaction,
    )
      .then(async json => {
        if (json.errors.length == 0) {
          handleCancelSelectedTransaction();

          await get(0, '');
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };

  const handleDeleteTransaction = async (transactionId: number) => {
    setClearSearch(prev => !prev);
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.transactionEnpoint}/delete`,
      {
        transactionId: transactionId,
      },
    )
      .then(async json => {
        if (json.errors.length == 0) {
          await get(0, '');
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(stopLoading());
      });
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
