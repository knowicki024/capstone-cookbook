import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from './Header';
import Login from './Login';

const API = "http://127.0.0.1:8888";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login API={API} />} />

        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
