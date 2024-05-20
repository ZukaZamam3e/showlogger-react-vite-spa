import { ReactNode, useEffect, useState } from 'react';
import { protectedResources } from '../../config/apiConfig';
import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { ErrorMessage } from '../ErrorMessage';
import { Backdrop, CircularProgress, Fab } from '@mui/material';
import { TransactionCard } from './TransactionCard';
import {
  TransactionModel,
  createNewTransaction,
} from '../../models/TransactionModel';
import { List } from '../List';
import { placements } from '../../config/placementConfig';
import AddIcon from '@mui/icons-material/Add';
import { CodeValueModel } from '../../models/CodeValueModel';
import { EditAmcTransaction } from './EditAmcTransaction';
import { TransactionItemModel } from '../../models/TransactionItemModel';

interface AmcTabProps {
  isMobile: boolean;
}

export const AmcTab = (props: AmcTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getData, postData } = useFetch();
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [transactionTypeIds, setTransactionTypeIds] = useState<
    CodeValueModel[]
  >([]);
  const [transactionItems, setTransactionItems] = useState<
    TransactionItemModel[]
  >([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [hideAddButton, setHideAddButton] = useState(false);
  const [take, setTake] = useState(props.isMobile ? 12 : 24);

  const [editing, setEditing] = useState({
    show: false,
    editingTransaction: createNewTransaction(),
  });

  useEffect(() => {
    setTake(props.isMobile ? 12 : 24);
  }, [props.isMobile]);

  const load = async () => {
    setIsLoading(true);
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
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const get = async (page: number, search: string) => {
    setIsLoading(true);
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.transactionEnpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setTransactions(json.model.transactions);
          setTransactionCount(json.model.count);
        } else {
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleTransactionSave = async (transaction: TransactionModel) => {
    setClearSearch(prev => !prev);
    setIsLoading(true);

    await postData(
      `${protectedResources.oaprojectsApi.transactionEnpoint}/save`,
      transaction,
    )
      .then(async json => {
        if (json.errors.length == 0) {
          handleCancelSelectedTransaction();

          await get(0, '');
        } else {
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteTransaction = async (transactionId: number) => {
    setClearSearch(prev => !prev);
    setIsLoading(true);
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
          setHasError(true);
          setErrors(json.errors);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const handleCloseErrors = () => {
    setErrors([]);
    setHasError(false);
  };

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

  let body: ReactNode;

  if (editing.show) {
    body = (
      <>
        <EditAmcTransaction
          transaction={editing.editingTransaction}
          transactionTypeIds={transactionTypeIds}
          transactionItems={transactionItems}
          onTransactionSave={handleTransactionSave}
          onCancelSelectedTransaction={handleCancelSelectedTransaction}
        />
      </>
    );
  } else {
    body = (
      <>
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
          isMobile={props.isMobile}
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
      </>
    );
  }

  return (
    <>
      {body}
      <ErrorMessage
        open={hasError}
        onClose={handleCloseErrors}
        errors={errors}
      />
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
