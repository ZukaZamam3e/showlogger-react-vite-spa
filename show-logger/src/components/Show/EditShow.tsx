import {
  Box,
  Button,
  Card,
  Fab,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputBaseComponentProps,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { ShowModel } from '../../models/ShowModel';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useRef, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { CodeValueModel } from '../../models/CodeValueModel';
import { EditTransaction } from './EditTransaction';
import { NewTransaction } from './NewTransaction';
import { TransactionItemModel } from '../../models/TransactionItemModel';
import { TransactionModel } from '../../models/TransactionModel';
import { SearchResultsModel } from '../../models/SearchResultsModel';
import { placements } from '../../config/placementConfig';

interface EditShowProps {
  show: ShowModel;
  showTypeIds: CodeValueModel[];
  transactionItems: TransactionItemModel[];
  selectedResult?: SearchResultsModel;
  onCancelSelectedShow: () => void;
  onShowSave: (show: ShowModel, searchSkippedOrEdit: boolean) => void;
  searchSkippedOrEdit: boolean;
}

export const EditShow = (props: EditShowProps) => {
  const [show, setShow] = useState<ShowModel>(props.show);
  const [seasonNumber, setSeasonNumber] = useState(
    props.show.seasonNumber ?? 1,
  );
  const [episodeNumber, setEpisodeNumber] = useState(
    props.show.episodeNumber ?? 1,
  );
  const restartBinge = show.restartBinge ? 1 : 0;

  const [newTransactionId, setNewTransactionId] = useState(-1);

  const getAmcInfoValue = (id: number, quantity: boolean = false) => {
    const transaction = show.transactions?.filter(
      m => m.transactionTypeId == id,
    );

    let amount = quantity ? 0 : 0;

    if (!!transaction && transaction?.length > 0) {
      amount = quantity ? transaction[0].quantity : transaction[0].costAmt;
    }

    return amount;
  };

  const amcTax = getAmcInfoValue(2006);
  const amcRewards = getAmcInfoValue(2005);
  const amcBenefits = getAmcInfoValue(2004);
  const amcAlistTicket = getAmcInfoValue(2000);
  const amcTicket = getAmcInfoValue(2001);
  const amcTicketQauntity = getAmcInfoValue(2001, true);

  const purchases = show.transactions?.filter(m => m.transactionTypeId == 2002);

  const sumPurchases = !!purchases
    ? purchases.reduce(
        (sum, current) =>
          sum + (current.deleteTransaction ? 0 : current.costAmt),
        0,
      )
    : 0;

  const purchaseTotal = (
    sumPurchases +
    amcTax -
    amcRewards -
    amcBenefits
  ).toFixed(2);

  const onChange = (e: any) => {
    const updatedShow = () => {
      if (
        e.target.name === 'seasonNumber' ||
        e.target.name === 'episodeNumber'
      ) {
        let value = parseInt(e.target.value);

        if (e.target.name === 'seasonNumber') {
          setSeasonNumber(value);
        } else {
          setEpisodeNumber(value);
        }

        return { ...show, [e.target.name]: value };
      } else {
        return { ...show, [e.target.name]: e.target.value };
      }
    };

    setShow(updatedShow());
  };

  const handleShowDateChange = (value: any) => {
    const updatedShow = { ...show, ['dateWatched']: value.toDate() };
    setShow(updatedShow);
  };

  const handleShowTypeIdChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: number,
  ) => {
    const updatedShow = { ...show, ['showTypeId']: newValue };
    setShow(updatedShow);
  };

  const handleShowSave = () => {
    const saveData: ShowModel = { ...show };

    if (saveData.showTypeId != 1000) {
      saveData.episodeNumber = undefined;
      saveData.seasonNumber = undefined;
    }

    props.onShowSave(saveData, props.searchSkippedOrEdit);
  };

  const handleAddSeasonNumber = () => {
    const updatedShow = {
      ...show,
      ['seasonNumber']: (show.seasonNumber ?? 0) + 1,
    };
    setShow(updatedShow);
    setSeasonNumber(() => updatedShow.seasonNumber);
  };

  const handleResetEpisodeNumber = () => {
    const updatedShow = { ...show, ['episodeNumber']: 1 };
    setShow(updatedShow);
    setEpisodeNumber(() => updatedShow.episodeNumber);
  };

  const handleRestartBingeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: number,
  ) => {
    const bNewValue = newValue == 1;
    const updatedShow = { ...show, ['restartBinge']: bNewValue };
    setShow(updatedShow);
  };

  const handleAddTransactionItem = (item: TransactionItemModel) => {
    const newItem: TransactionModel = {
      transactionTypeId: 2002, // PURCHASE
      costAmt: item.costAmt,
      item: item.item,
      quantity: item.quantity,
      transactionId: newTransactionId,
      deleteTransaction: false,
    };

    setNewTransactionId(prev => prev - 1);

    const updatedTransactions = [newItem];

    if (!!show.transactions) {
      updatedTransactions.push(...(show.transactions as TransactionModel[]));
    }

    const updatedShow = {
      ...show,
      ['transactions']: updatedTransactions,
    } as ShowModel;

    setShow(updatedShow);
  };

  const handleTransactionItemChange = (id: number, e: any) => {
    if (!!show.transactions) {
      const updatedTransactions = show.transactions.map(
        (transaction: TransactionModel) => {
          if (id == transaction.transactionId) {
            if (e.target.name === 'deleteTransaction') {
              return { ...transaction, [e.target.name]: e.target.checked };
            } else if (e.target.name === 'item') {
              return { ...transaction, [e.target.name]: e.target.value };
            } else {
              return { ...transaction, [e.target.name]: +e.target.value };
            }
          } else {
            return transaction;
          }
        },
      );

      const updatedShow = {
        ...show,
        ['transactions']: updatedTransactions,
      } as ShowModel;

      setShow(updatedShow);
    }
  };

  const amcInfoUpdate = (name: string, amount: string) => {
    let transactionTypeId = 2000;
    switch (name) {
      case 'aListTicket': {
        transactionTypeId = 2000;
        break;
      }
      case 'tax': {
        transactionTypeId = 2006;
        break;
      }
      case 'benefits': {
        transactionTypeId = 2004;
        break;
      }
      case 'rewards': {
        transactionTypeId = 2005;
        break;
      }
      case 'ticket':
      case 'ticketQuantity': {
        transactionTypeId = 2001;
        break;
      }
    }

    let transactions: TransactionModel[] = [];

    if (!!show.transactions) {
      transactions = show.transactions;
    }

    let amcInfo = transactions?.filter(
      item => item.transactionTypeId == transactionTypeId,
    );

    if (amcInfo?.length == 0) {
      transactions.push({
        quantity: 1,
        transactionTypeId: transactionTypeId,
        transactionId: newTransactionId,
        costAmt: 0,
        item: getAmcInfoName(transactionTypeId),
        deleteTransaction: false,
      });

      setNewTransactionId(prev => prev - 1);
    }

    const updatedTransactions = transactions.map(
      (transaction: TransactionModel) => {
        if (transactionTypeId == transaction.transactionTypeId) {
          if (transactionTypeId == 2001 && name == 'ticketQuantity') {
            return { ...transaction, ['quantity']: +amount };
          } else {
            return { ...transaction, ['costAmt']: +amount };
          }
        } else {
          return transaction;
        }
      },
    );

    const updatedShow: ShowModel = {
      ...show,
      ['transactions']: updatedTransactions,
    };

    setShow(updatedShow);
  };

  const getAmcInfoName = (transactionTypeId: number) => {
    switch (transactionTypeId) {
      case 2000: {
        return 'A-list Ticket';
      }
      case 2001: {
        return 'Ticket';
      }
      case 2004: {
        return 'Benefits';
      }
      case 2005: {
        return 'Rewards';
      }
      case 2006: {
        return 'Tax';
      }
      default: {
        return '';
      }
    }
  };

  const currencyInputProps: InputBaseComponentProps = {
    inputMode: 'decimal',
    //pattern: '[0-9]+([\.,][0-9]+)?',
    style: { textAlign: 'right' },
  };

  return (
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
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Date Watched"
              value={dayjs(show.dateWatched)}
              onChange={value => handleShowDateChange(value)}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              name="showName"
              label="Name"
              defaultValue={show.showName}
              onChange={e => {
                onChange(e);
              }}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              name="showNotes"
              label="Notes"
              multiline
              defaultValue={show.showNotes}
              onChange={e => {
                onChange(e);
              }}
            />
          </Grid>
          <Grid xs={12}>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={show.showTypeId}
              onChange={handleShowTypeIdChange}
              fullWidth
            >
              {props.showTypeIds.map(showTypeId => (
                <ToggleButton
                  value={showTypeId.codeValueId}
                  key={showTypeId.codeValueId}
                >
                  {showTypeId.decodeTxt}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          {show.showTypeId == 1000 && (
            <Grid container spacing={3} xs={6}>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="seasonNumber"
                  label="Season"
                  type="number"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  value={seasonNumber}
                  onChange={e => {
                    onChange(e);
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ height: '100%' }}
                  onClick={handleAddSeasonNumber}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          )}
          {show.showTypeId == 1000 && (
            <Grid container spacing={3} xs={6}>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="episodeNumber"
                  label="Episode"
                  type="number"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  value={episodeNumber}
                  onChange={e => {
                    onChange(e);
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <Button
                  variant="contained"
                  disableElevation
                  fullWidth
                  sx={{ height: '100%' }}
                  onClick={handleResetEpisodeNumber}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          )}
          {show.showTypeId == 1000 && (
            <Grid xs={12}>
              <ToggleButtonGroup
                color="primary"
                exclusive
                value={restartBinge}
                onChange={handleRestartBingeChange}
                fullWidth
              >
                <ToggleButton value={0}>Continue Binge</ToggleButton>
                <ToggleButton value={1}>Restart Binge</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          )}
          {show.showTypeId == 1002 && (
            <Grid container spacing={3} xs={12}>
              <Grid xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel>Total Purchases</InputLabel>
                  <OutlinedInput
                    inputProps={currencyInputProps}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    name="totalPurchases"
                    label="Total Purchases"
                    type="number"
                    disabled
                    value={purchaseTotal}
                  />
                </FormControl>
              </Grid>
            </Grid>
          )}
          {show.showTypeId == 1002 && (
            <Grid container spacing={3} xs={6}>
              <Grid xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>A List Ticket</InputLabel>
                  <OutlinedInput
                    inputProps={currencyInputProps}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    name="aListTicket"
                    label="A List Ticket"
                    type="number"
                    value={amcAlistTicket}
                    onChange={e => amcInfoUpdate(e.target.name, e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Tax</InputLabel>
                  <OutlinedInput
                    inputProps={currencyInputProps}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    name="tax"
                    label="Tax"
                    type="number"
                    value={amcTax}
                    onChange={e => amcInfoUpdate(e.target.name, e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
          )}
          {show.showTypeId == 1002 && (
            <Grid container spacing={3} xs={6}>
              <Grid xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Benefits</InputLabel>
                  <OutlinedInput
                    inputProps={currencyInputProps}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    name="benefits"
                    label="Benefits"
                    type="number"
                    value={amcBenefits}
                    onChange={e => amcInfoUpdate(e.target.name, e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Rewards</InputLabel>
                  <OutlinedInput
                    inputProps={currencyInputProps}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    name="rewards"
                    label="Rewards"
                    type="number"
                    value={amcRewards}
                    onChange={e => amcInfoUpdate(e.target.name, e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
          )}

          {show.showTypeId == 1002 && (
            <>
              <Grid xs={6} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>AMC Ticket</InputLabel>
                  <OutlinedInput
                    inputProps={currencyInputProps}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    name="ticket"
                    label="AMC Ticket"
                    type="number"
                    value={amcTicket}
                    onChange={e => amcInfoUpdate(e.target.name, e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={6} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Quantity</InputLabel>
                  <OutlinedInput
                    inputProps={{ style: { textAlign: 'right' } }}
                    // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    name="ticketQuantity"
                    label="Quantity"
                    type="number"
                    value={amcTicketQauntity}
                    onChange={e => amcInfoUpdate(e.target.name, e.target.value)}
                  />
                </FormControl>
              </Grid>
            </>
          )}
          {show.showTypeId == 1002 && (
            <Grid container spacing={3} xs={12}>
              <Grid xs={12}>
                <hr />
                Tranasctions
                <hr />
                <NewTransaction
                  transactionItems={props.transactionItems}
                  onAddItem={handleAddTransactionItem}
                />
                <hr />
                {purchases?.map(transaction => (
                  <EditTransaction
                    key={transaction.transactionId}
                    onChange={handleTransactionItemChange}
                    transaction={transaction}
                    transactionItems={props.transactionItems}
                  />
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>

        <Fab
          sx={{
            position: 'fixed',
            bottom: placements.fab.firstIconBottom,
            right: placements.fab.right,
          }}
          color="success"
          aria-label="add"
          onClick={handleShowSave}
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
          onClick={props.onCancelSelectedShow}
        >
          <CancelIcon />
        </Fab>
      </Paper>
    </Box>
  );
};
