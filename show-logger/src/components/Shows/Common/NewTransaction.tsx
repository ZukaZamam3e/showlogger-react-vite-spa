import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { TransactionItemModel } from '../../../models/TransactionItemModel';
import { formatter } from '../../../models/ShowModel';
import { SLTextField } from '../../Common/SLTextField';
import { SLIconButton } from '../../Common/SLIconButton';

interface NewTransactionProps {
  transactionItems: TransactionItemModel[];
  textboxEnabled?: boolean;
  buttonText?: string;
  showTransactionType?: boolean;
  onAddItem: (item: TransactionItemModel) => void;
}

export const NewTransaction = (props: NewTransactionProps) => {
  let textboxEnabled = true;
  if (props.textboxEnabled !== undefined) {
    textboxEnabled = props.textboxEnabled;
  }

  let buttonText = 'Add Transaction';
  if (props.buttonText !== undefined) {
    buttonText = props.buttonText;
  }

  let showTransactionType = true;
  if (props.showTransactionType !== undefined) {
    showTransactionType = props.showTransactionType;
  }

  const [optionSelect, setOptionSelect] = useState(true);
  const [selectedItem, setSelectedItem] = useState('');

  const handleOptionSelectToggle = () => {
    setOptionSelect(prev => !prev);
    setSelectedItem('');
  };

  const handleItemChange = (event: SelectChangeEvent) => {
    setSelectedItem(event.target.value as string);
  };

  const handleAddItem = () => {
    if (!!selectedItem) {
      let item = optionSelect
        ? props.transactionItems.find(m => m.item === selectedItem)
        : ({
            item: selectedItem,
            quantity: 1,
            costAmt: 0,
          } as TransactionItemModel);

      if (!!item) {
        props.onAddItem(item);
      }
    }
  };

  const xsOptionSelect = props.textboxEnabled ? 10 : 12;

  return (
    <Grid xs={12} sx={{ p: 0 }}>
      <Grid container spacing={3} xs={12}>
        <Grid xs={xsOptionSelect} sx={{ pb: 0 }}>
          {optionSelect ? (
            <FormControl fullWidth>
              <InputLabel>Item</InputLabel>
              <Select
                name="item"
                label="Item"
                defaultValue={''}
                fullWidth
                onChange={handleItemChange}
              >
                {props.transactionItems.map(item => (
                  <MenuItem key={item.item} value={item.item}>
                    {props.showTransactionType &&
                      `${item.transactionTypeIdZ}: `}
                    {item.item} ({item.quantity} -{' '}
                    {formatter.format(item.costAmt)})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <SLTextField
              fullWidth
              name="item"
              label="Item"
              onChange={(event: any) => setSelectedItem(event.target.value)}
            />
          )}
        </Grid>
        {props.textboxEnabled && (
          <Grid xs={2}>
            <SLIconButton
              aria-label="Toggle"
              size={'large'}
              onClick={handleOptionSelectToggle}
            >
              {optionSelect ? <ListIcon /> : <EditIcon />}
            </SLIconButton>
          </Grid>
        )}
        <Grid xs={12}>
          <Button fullWidth variant="contained" onClick={handleAddItem}>
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
