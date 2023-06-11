import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Main from '../pages/Main';

function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Main />} />
    </Routes>

    </BrowserRouter>
  )
}

export default Router