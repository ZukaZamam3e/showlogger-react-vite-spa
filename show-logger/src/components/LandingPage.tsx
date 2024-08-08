import { useSelector } from 'react-redux';
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserPref } from '../slices/userPrefSlice';
import { Shows } from './Shows/Shows';
import { HomePage } from './HomePage/HomePage';
import { Books } from './Books/Books';
import { loginApi } from '../api/loginApi';

export const LandingPage = () => {
  const { loadLogin } = loginApi();
  const dispatch = useDispatch();
  const userPref = useSelector((state: any) => state.userPref.value);

  const loadUserPref = async () => {
    const { data } = await loadLogin();
    dispatch(updateUserPref(data));
  };

  useEffect(() => {
    loadUserPref();
  }, []);

  let body: ReactNode = null;

  if (userPref?.defaultArea === 'Shows') {
    body = <Shows />;
  } else if (userPref?.defaultArea === 'Books') {
    body = <Books />;
  } else {
    body = <HomePage />;
  }

  return <>{body}</>;
};
