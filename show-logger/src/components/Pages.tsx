import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';
import { Testing } from './Testing';
import { Profile } from './Profile';

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};
