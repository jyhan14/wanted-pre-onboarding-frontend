import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Todo from '../pages/Todo';

function Router() {
  const accessToken = localStorage.getItem('access_token');
  
  return (
    <BrowserRouter>
      <Routes>
        {!accessToken ? (
          <Route path="/" element={<Navigate to="/signin" replace />} />
        ) : (
          <Route path="/" element={<Navigate to="/todo" replace />} />
        )}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;