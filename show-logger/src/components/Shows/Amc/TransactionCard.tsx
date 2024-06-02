import { Card, IconButton, Stack, Typography } from '@mui/material';
import { TransactionModel } from '../../../models/TransactionModel';
import Grid from '@mui/material/Unstable_Grid2';
import { formatter } from '../../../models/ShowModel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { SLIconButton } from '../../Common/SLIconButton';

interface TransactionProps {
  transaction: TransactionModel;
  onSelectTransaction: (transaction: TransactionModel) => void;
  onDeleteTransaction: (transactionId: number) => void;
}

export const TransactionCard = (props: TransactionProps) => {
  
  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: 1,
            minHeight: {
              sm: 200,
            },
          }}
        >
          <Grid
            xs={6}
            sm={12}
            sx={{
              p: 1,
              mt: {
                xs: 0,
                sm: 0,
              },
            }}
          >
            <Typography variant="body2" color="text.primary">
              {props.transaction.transactionDate &&
                new Date(
                  props.transaction.transactionDate,
                ).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.transaction.transactionTypeIdZ}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.transaction.item}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {formatter.format(props.transaction.costAmt)}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.transaction.quantity}
            </Typography>
          </Grid>
          <Grid xs={6} sm={12}>
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: 'center' }}
              >
                <SLIconButton
                  aria-label="Edit"
                  onClick={() => {
                    props.onSelectTransaction(props.transaction);
                  }}
                >
                  <EditIcon style={{ color: 'cornflowerblue' }} />
                </SLIconButton>
                <SLIconButton
                  aria-label="Delete"
                  onClick={() => {
                    props.onDeleteTransaction(props.transaction.transactionId);
                  }}
                >
                  <DeleteIcon style={{ color: 'red' }} />
                </SLIconButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
