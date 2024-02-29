import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Login from './Login';

const API = "http://127.0.0.1:8888";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  return (
    <>
      <Header/>
      <Routes>
        <Route path="/*" element={user ? <Home API={API} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login API={API} user = {user}/>} />
      </Routes>
    </>
  );
}

export default App;
