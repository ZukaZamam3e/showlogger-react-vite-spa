import {Routes,Route} from "react-router-dom"

import { HomePage } from './HomePage';
import { Profile } from "./Profile";


export const Pages = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}