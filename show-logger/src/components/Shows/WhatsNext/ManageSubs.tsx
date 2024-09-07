import { useEffect, useState } from 'react';
import { List } from '../../Common/List';
import { placements } from '../../../config/placementConfig';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { whatsNextApi } from '../../../api/whatsNextApi';
import {
  createNewWhatsNextSub,
  WhatsNextSubModel,
} from '../../../models/WhatsNextSubModel';
import { CreateSubscriptionModel } from '../../../models/CreateSubscriptionModel';
import { NewSubscription } from './NewSubscription';
import { SubscriptionCard } from './SubscriptionCard';
import { EditSubscription } from './EditSubscription';

interface ManageSubsProps {
  onCancleManageSub: () => void;
}

export const ManageSubs = (props: ManageSubsProps) => {
  const {
    loadSubscriptions,
    getSubscriptions,
    createSubscription,
    saveWhatsNext,
    deleteWhatsNext,
  } = whatsNextApi();

  const [subscriptions, setSubscriptions] = useState<WhatsNextSubModel[]>([]);
  const [subscriptionsCount, setSubscriptionsCount] = useState<number>(0);
  const [hideAddButton, setHideAddButton] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [editing, setEditing] = useState({
    show: false,
    editingSub: createNewWhatsNextSub(),
  });
  const [creating, setCreating] = useState({
    show: false,
    creatingSub: createNewWhatsNextSub(),
  });
  const take = 12;

  const load = async () => {
    const { data, count } = await loadSubscriptions(take);
    setSubscriptions(data);
    setSubscriptionsCount(count);
  };

  const get = async (page: number, search: string) => {
    const { data, count } = await getSubscriptions(page, take, search);
    setSubscriptions(data);
    setSubscriptionsCount(count);
  };

  const handleAddNew = () => {
    let newSub: WhatsNextSubModel = createNewWhatsNextSub();

    setCreating({ show: true, creatingSub: newSub });
  };

  const handleSubcriptionSave = async (subscription: WhatsNextSubModel) => {
    setClearSearch(prev => !prev);
    const updatedSub = await saveWhatsNext(subscription);

    if (updatedSub != null) {
      handleCancelSelectedSub();
      await get(0, '');
    }
  };

  const handleSubcriptionCreate = async (subscription: WhatsNextSubModel) => {
    setClearSearch(prev => !prev);
    const createSub: CreateSubscriptionModel = {
      subscribeDate: subscription.subscribeDate,
      includeSpecials: subscription.includeSpecials,
      api: subscription.api,
      type: subscription.type,
      id: subscription.id,
    };
    const updatedSub = await createSubscription(createSub);

    if (updatedSub != null) {
      handleCancelCreatingSub();
      await get(0, '');
    }
  };

  const handleSubcriptionDelete = async (subscriptionId: number) => {
    const success = await deleteWhatsNext(subscriptionId);

    if (success) {
      await get(0, '');
    }
  };

  const handleSelectSubscription = (subscription: WhatsNextSubModel) => {
    setEditing({ show: true, editingSub: subscription });
  };

  const handleCancelCreatingSub = () => {
    setCreating({ show: false, creatingSub: createNewWhatsNextSub() });
  };

  const handleCancelSelectedSub = () => {
    setEditing({ show: false, editingSub: createNewWhatsNextSub() });
  };

  const handleToggleSearch = () => {
    setHideAddButton(prev => !prev);
  };

  useEffect(() => {
    load();
  }, []);

  const sxBody = {
    display: !editing.show && !creating.show ? 'initial' : 'none',
  };

  const editSub = editing.show && (
    <EditSubscription
      subscription={editing.editingSub}
      onCancelSelectedSubscription={handleCancelSelectedSub}
      onSubscriptionSave={handleSubcriptionSave}
    />
  );

  const createSub = creating.show && (
    <NewSubscription
      subscription={createNewWhatsNextSub()}
      onCancelCreatingSubscription={handleCancelCreatingSub}
      onCreateSubscription={handleSubcriptionCreate}
    />
  );

  const body = (
    <div style={sxBody}>
      {!hideAddButton && (
        <>
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
          <Fab
            sx={{
              position: 'fixed',
              bottom: placements.fab.thirdIconBottom,
              right: placements.fab.right,
            }}
            color="error"
            aria-label="close"
            onClick={props.onCancleManageSub}
          >
            <CancelIcon />
          </Fab>
        </>
      )}

      <List
        count={subscriptionsCount}
        onGet={get}
        clearSearch={clearSearch}
        take={take}
        onToggleSearch={handleToggleSearch}
      >
        {subscriptions.map((sub: WhatsNextSubModel) => (
          <SubscriptionCard
            subscription={sub}
            onSelectSubscription={handleSelectSubscription}
            onDeleteSubscription={handleSubcriptionDelete}
          />
        ))}
      </List>
    </div>
  );

  return (
    <>
      {body}
      {createSub}
      {editSub}
    </>
  );
};
