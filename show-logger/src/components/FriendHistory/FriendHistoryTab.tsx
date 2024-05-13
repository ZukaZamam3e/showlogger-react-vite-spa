import { useEffect, useState } from 'react';
import { protectedResources } from '../../config/apiConfig';
import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { ErrorMessage } from '../ErrorMessage';
import { Backdrop, CircularProgress } from '@mui/material';
import { List } from '../List';
import { FriendHistoryCard } from './FriendHistoryCard';
import { FriendHistoryModel } from '../../models/FriendHistoryModel';

interface FriendHistoryTabProps {
  isMobile: boolean;
}

export const FriendHistoryTab = (props: FriendHistoryTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getData } = useFetch();
  const [friendHistory, setFriendHistory] = useState<FriendHistoryModel[]>([]);
  const [friendHistoryCount, setFriendHistoryCount] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);
  const take = 12;

  const get = async (page: number, search: string) => {
    setIsLoading(true);
    const offset = page * take;
    await getData(
      `${protectedResources.oaprojectsApi.friendHistoryEnpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    )
      .then(json => {
        if (json.errors.length == 0) {
          setFriendHistory(json.model.friendHistory);
          setFriendHistoryCount(json.model.count);
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
    get(0, '');
  }, []);

  const handleCloseErrors = () => {
    setErrors([]);
    setHasError(false);
  };

  return (
    <>
      <List count={friendHistoryCount} isMobile={props.isMobile} onGet={get}>
        {friendHistory.map((fh: FriendHistoryModel) => (
          <FriendHistoryCard
            key={fh.show.showId}
            show={fh.show}
            name={fh.name}
            isMobile={props.isMobile}
          />
        ))}
      </List>
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
