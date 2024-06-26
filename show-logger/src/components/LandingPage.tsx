import { useSelector } from 'react-redux';
import { useFetch } from '../hooks/useFetchOAProjectsAPI';
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../slices/isLoadingSlice';
import { updateUserPref } from '../slices/userPrefSlice';
import { showErrors } from '../slices/errorsSlice';
import { protectedResources } from '../config/apiConfig';
import { Shows } from './Shows/Shows';
import { HomePage } from './HomePage/HomePage';
import { Books } from './Books/Books';

export const LandingPage = () => {
  const dispatch = useDispatch();
  const { getData } = useFetch();
  const userPref = useSelector((state: any) => state.userPref.value);

  const loadUserPref = async () => {
    dispatch(startLoading());
    await getData(protectedResources.oaprojectsApi.loginEndpoint + '/load')
      .then(async json => {
        if (json.errors.length == 0) {
          dispatch(updateUserPref(json.model.userPref));
          //navigate(`/${json.model.userPref.defaultArea}`);
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
    loadUserPref();
  }, []);

  let body: ReactNode = null;

  if (userPref?.defaultArea === 'shows') {
    body = <Shows />;
  } else if (userPref?.defaultArea === 'books') {
    body = <Books />;
  } else {
    body = <HomePage />;
  }

  return <>{body}</>;
};
