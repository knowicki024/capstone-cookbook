import React, {useState, useEffect} from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from './Home';
// import HomePage from './Home';
import Header from './Header';
import Login from './Login';
import {useNavigate} from "react-router-dom"

const API = "http://127.0.0.1:8888";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  const onLogin = (user) => {
    setUser(user);
    console.log(user)

    navigate('/')
  };
  
  const onLogOut = () => {
    setUser(null);
    navigate('/login')
  };
  
  useEffect(() => {
    fetch(`${API}/check_session`)
      .then((r) => {
        if (!r.ok) {
          throw new Error('Session check failed');
        }
        return r.json();
      })
      .then((user) => setUser(user))
      // navigate('/login')
      .catch(() => setUser(null));
  }, [navigate]);

  return (
    <>
      <Header onLogOut={onLogOut} user={user} />
      <Routes>
        {/* <Route path="/login" element={<Login API={API} onLogin={onLogin} />} /> */}
        <Route path="*" element={user ? <Home API={API}  /> : <Login API={API} onLogin={onLogin} />} />
      </Routes>
    </>
  );
}

export default App;
