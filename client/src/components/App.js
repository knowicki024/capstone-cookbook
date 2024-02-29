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

  useEffect(() => {
    fetch(`${API}/check_session`, { credentials: 'include' })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error('Not authenticated');
        }
      })
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);

  const onLogin = (user) => {
    setUser(user);
    navigate("/home", { replace: true });
  };

  const onLogout = () => {
    fetch(`${API}/logout`, { credentials: 'include' })
      .then(() => setUser(null))
      .catch(console.error);
  };

  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <Routes>
        <Route path="/home" element={user ? <Home API={API} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Login onLogin={onLogin} API={API} />} />
      </Routes>
    </>
  );
}

export default App;
