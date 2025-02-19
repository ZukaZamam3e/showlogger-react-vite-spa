import { Routes, Route } from 'react-router-dom';
import { HomePage } from './HomePage/HomePage';
import { Shows } from './Shows/Shows';
import { LandingPage } from './LandingPage';
import { Books } from './Books/Books';
import { Friends } from './Friends/Friends';
import { Info } from './Info/Info';
import { useSelector } from 'react-redux';
import { Watched } from './Watched/Watched';
// import { Help } from './Help/Help';

export const Pages = () => {
  const userPref = useSelector((state: any) => state.userPref.value);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/shows" element={<Shows />} />
      <Route path="/watched" element={<Watched />} />
      <Route path="/books" element={<Books />} />
      {userPref != null && userPref.hasAdminRole && (
        <Route path="/info" element={<Info />} />
      )}
      <Route path="/friends" element={<Friends />} />
      {/* <Route path="/help" element={<Help />} /> */}
    </Routes>
  );
};
