import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { SLIconButton } from './SLIconButton';
import Grid from '@mui/material/Unstable_Grid2';
import { useRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface SLDatePickerProps {
  label: string;
  date?: Date;
  onDateChange: (value: any) => void;
}

export const SLDatePicker = (props: SLDatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const clearDate = () => {
    props.onDateChange(null);
  };

  return (
    <Grid container spacing={3} xs={12}>
      <Grid xs={10} sm={11}>
        <DatePicker
          slotProps={{ textField: { fullWidth: true, required: false } }}
          closeOnSelect
          inputRef={inputRef}
          value={props.date && dayjs(props.date)}
          onChange={props.onDateChange}
          label={props.label}
        />
      </Grid>
      <Grid xs={2} sm={1}>
        <SLIconButton aria-label="Clear" size="large" onClick={clearDate}>
          <ClearIcon style={{ color: 'red' }} />
        </SLIconButton>
      </Grid>
    </Grid>
  );
};
