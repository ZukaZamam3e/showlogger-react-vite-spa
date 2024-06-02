import { Routes, Route } from 'react-router-dom';
import { HomePage } from './HomePage/HomePage';
import { Shows } from './Shows/Shows';
import { LandingPage } from './LandingPage';
import { Books } from './Books/Books';

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/shows" element={<Shows />} />
      <Route path="/books" element={<Books />} />
      <Route path="/info" element={<Info />} />
      <Route path="/friends" element={<Friends />} />
    </Routes>
  );
};

export const Info = () => {
  return <>Info</>;
};

export const Friends = () => {
  return <>Friends</>;
};
