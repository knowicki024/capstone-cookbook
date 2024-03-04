
import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Login from './Login';

import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// const API = "http://127.0.0.1:8888";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = () => {
    setIsLoggedIn(true);
  };



  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate replace to="/" />} />
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate replace to="/login" />} />
      </Routes>
    </>
  );
}

export default App;



























// // src/App.js
// import React from 'react';
// import { Route, Routes } from "react-router-dom";
// import Home from './Home';
// import Header from './Header';
// import '../index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';



// function App() {
//  return (
//    <div>
//      <Header />
//      <Routes>
//        <Route path="*" element={<Home />} />
//      </Routes>
//    </div>      
//  );
// }
// export default App;






































// import React, {useState, useEffect} from 'react';
// import { Route, Routes, Router, Navigate} from 'react-router-dom';
// // import MainPage from './MainPage';
// import Header from './Header';
// import Home from './Home';
// import Login from './Login';


// import '../index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';



// const API = "http://127.0.0.1:8888";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // const [user, setUser] = useState(null);
//   // const navigate = useNavigate()

//   // const onLogin = (user) => {
//   //   setUser(user);
//   //   console.log(user)
//   // };
  
//   // const onLogOut = () => {
//   //   setUser(null);
//   // };
  
//   // useEffect(() => {
//   //   fetch(`${API}/check_session`)
//   //     .then((r) => {
//   //       if (!r.ok) {
//   //         throw new Error('Session check failed');
//   //       }
//   //       return r.json();
//   //     })
//   //     .then((user) => setUser(user))
//   //     .catch(() => {
//   //       setUser(null);
//   //       navigate('/login'); 
//   //     });
//   // }, [navigate]);

//   const handleLogin = (user, password) => {
   
//     setIsLoggedIn(true);
//   };
  

//   return (
//       <Router>
//         <Header />
//         <div>
//           <Routes>
//             <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate replace to="/" />} />
//             <Route path="/" element={isLoggedIn ? <Home /> : <Navigate replace to="/login" />} />
//           </Routes>
//         </div>
//       </Router>
//     );
//   }
  
//   export default App;










