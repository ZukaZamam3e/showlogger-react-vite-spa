import Grid from '@mui/material/Unstable_Grid2';
import { TransactionModel } from '../../models/TransactionModel';
import {
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { TransactionItemModel } from '../../models/TransactionItemModel';

interface EditTransactionProps {
  transaction: TransactionModel;
  transactionItems: TransactionItemModel[];
  onChange: (id: number, e: any) => void;
}

export const EditTransaction = (props: EditTransactionProps) => {
  const sxButton = { border: 1, borderRadius: '25%' };
  const deleteIndc = props.transaction.deleteTransaction;

  const deleteBorder = deleteIndc ? 'solid 1px red' : '';

  return (
    <>
      <Grid xs={12} sx={{ p: 0, borderRadius: 3, border: deleteBorder }}>
        <Grid container spacing={3} xs={12}>
          <Grid xs={12}>
            <TextField
              size={'small'}
              fullWidth
              name="item"
              label="Item"
              value={props.transaction.item}
              onChange={e => {
                props.onChange(props.transaction.transactionId, e);
              }}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              size={'small'}
              inputProps={{ style: { textAlign: 'right' } }}
              fullWidth
              name="quantity"
              type="number"
              label="Quantity"
              value={props.transaction.quantity}
              onChange={e => {
                props.onChange(props.transaction.transactionId, e);
              }}
            />
          </Grid>

          <Grid xs={5}>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                size={'small'}
                inputProps={{ style: { textAlign: 'right' } }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                name="costAmt"
                label="Cost"
                type="number"
                value={props.transaction.costAmt}
                onChange={e => {
                  props.onChange(props.transaction.transactionId, e);
                }}
              />
            </FormControl>
          </Grid>
          <Grid xs={3}>
            <Checkbox
              checkedIcon={<CancelIcon />}
              icon={<DeleteIcon />}
              name="deleteTransaction"
              value={props.transaction.deleteTransaction}
              onChange={e => {
                props.onChange(props.transaction.transactionId, e);
              }}
            />
            {/* <IconButton
                        aria-label="Delete"
                        sx={sxButton}
                        size={'small'}
                        onChange={(e) => { props.onChange(props.transaction.transactionId, e)}}
                        //onClick={() => { props.onDeleteShow(props.show.showId) }}
                    >
                        <DeleteIcon />
                    </IconButton> */}
          </Grid>
          {props.transaction.deleteTransaction && (
            <Grid xs={12} sx={{ color: 'red' }}>
              Item will be deleted when saved.
            </Grid>
          )}
        </Grid>
      </Grid>
      <hr />
    </>
  );
};
