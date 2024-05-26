import Grid from '@mui/material/Unstable_Grid2';
import { TransactionModel } from '../../models/TransactionModel';
import {
  Box,
  Fab,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { TransactionItemModel } from '../../models/TransactionItemModel';
import { useState } from 'react';
import { CodeValueModel } from '../../models/CodeValueModel';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { placements } from '../../config/placementConfig';
import { NewTransaction } from '../Common/NewTransaction';
import { SLTextField } from '../Common/SLTextField';
import { SLInput } from '../Common/SLInput';

interface EditAmcTransactionProps {
  transaction: TransactionModel;
  transactionTypeIds: CodeValueModel[];
  transactionItems: TransactionItemModel[];
  onCancelSelectedTransaction: () => void;
  onTransactionSave: (show: TransactionModel) => void;
}

export const EditAmcTransaction = (props: EditAmcTransactionProps) => {
  const [transaction, setTransaction] = useState<TransactionModel>(
    props.transaction,
  );

  const handleTransactionDateChange = (value: any) => {
    const updatedShow = { ...transaction, ['transactionDate']: value.toDate() };
    setTransaction(updatedShow);
  };

  const handleChange = (e: any) => {
    const updatedTransaction = () => {
      if (e.target.name === 'costAmt' || e.target.name === 'quantity') {
        let value = parseFloat(e.target.value);

        return { ...transaction, [e.target.name]: value };
      } else {
        return { ...transaction, [e.target.name]: e.target.value };
      }
    };

    setTransaction(updatedTransaction());
  };

  const handleTransactionTypeIdChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: number,
  ) => {
    const updatedTransaction = {
      ...transaction,
      ['transactionTypeId']: newValue,
    };
    setTransaction(updatedTransaction);
  };

  const handleAddTransactionItem = (item: TransactionItemModel) => {
    const updatedTransaction = {
      ...transaction,
      ['transactionTypeId']: item.transactionTypeId,
      ['item']: item.item,
      ['quantity']: item.quantity,
      ['costAmt']: item.costAmt,
    };

    setTransaction(updatedTransaction);
  };

  return (
    <>
      <Box
        sx={{
          paddingBottom: {
            xs: '185px',
            sm: '185px',
            md: '52px',
            lg: '52px',
          },
        }}
      >
        <Paper
          sx={{
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: 'white',
            borderRadius: 3,
            m: 2,
            padding: 3,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid xs={12}>
              <NewTransaction
                transactionItems={props.transactionItems}
                onAddItem={handleAddTransactionItem}
                buttonText={'Update Item'}
                showTransactionType={true}
              />
              <hr />
            </Grid>
            <Grid xs={12}>
              <DatePicker
                slotProps={{ textField: { fullWidth: true } }}
                label="Transaction Date"
                value={dayjs(transaction.transactionDate)}
                onChange={handleTransactionDateChange}
              />
            </Grid>
            <Grid xs={12}>
              <ToggleButtonGroup
                color="primary"
                exclusive
                value={transaction.transactionTypeId}
                onChange={handleTransactionTypeIdChange}
                fullWidth
              >
                {props.transactionTypeIds.slice(0, 2).map(transactionTypeId => (
                  <ToggleButton
                    value={transactionTypeId.codeValueId}
                    key={transactionTypeId.codeValueId}
                  >
                    {transactionTypeId.decodeTxt}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <ToggleButtonGroup
                color="primary"
                exclusive
                value={transaction.transactionTypeId}
                onChange={handleTransactionTypeIdChange}
                fullWidth
              >
                {props.transactionTypeIds.slice(2, 4).map(transactionTypeId => (
                  <ToggleButton
                    value={transactionTypeId.codeValueId}
                    key={transactionTypeId.codeValueId}
                  >
                    {transactionTypeId.decodeTxt}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
            <Grid xs={12}>
              <SLTextField
                fullWidth
                name="item"
                label="Item"
                value={transaction.item}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={12}>
              <SLTextField
                size={'small'}
                inputProps={{ style: { textAlign: 'right' } }}
                fullWidth
                name="quantity"
                type="number"
                label="Quantity"
                value={transaction.quantity}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <SLInput
                  size={'small'}
                  inputProps={{ style: { textAlign: 'right' } }}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  name="costAmt"
                  label="Cost"
                  type="number"
                  value={transaction.costAmt}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Fab
        sx={{
          position: 'fixed',
          bottom: placements.fab.firstIconBottom,
          right: placements.fab.right,
        }}
        color="success"
        aria-label="add"
        onClick={() => props.onTransactionSave(transaction)}
      >
        <SaveIcon />
      </Fab>
      <Fab
        sx={{
          position: 'fixed',
          bottom: placements.fab.secondIconBottom,
          right: placements.fab.right,
        }}
        color="error"
        aria-label="add"
        onClick={props.onCancelSelectedTransaction}
      >
        <CancelIcon />
      </Fab>
    </>
  );
};
