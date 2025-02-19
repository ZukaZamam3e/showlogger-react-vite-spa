import { useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { Shows } from './Shows/Shows';
import { HomePage } from './HomePage/HomePage';
import { Books } from './Books/Books';
import { Watched } from './Watched/Watched';

export const LandingPage = () => {
  const userPref = useSelector((state: any) => state.userPref.value);

  let defaultArea = userPref?.defaultArea;

  if (defaultArea != null) {
    defaultArea = defaultArea.toLowerCase();
  }

  let body: ReactNode = null;

  if (defaultArea === 'shows') {
    body = <Shows />;
  } else if (defaultArea === 'books') {
    body = <Books />;
  } else if (defaultArea === 'watched') {
    body = <Watched />;
  } else {
    body = <HomePage />;
  }

  return <>{body}</>;
};
