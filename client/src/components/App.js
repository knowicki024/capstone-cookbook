// src/App.js
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import Header from './Header';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
 return (
   <div>
     <Header />
     <Routes>
       <Route path="*" element={<Home />} />
     </Routes>
   </div>      
 );
}
export default App;






































// // import React, {useState, useEffect} from 'react';
// import { Route, Routes} from 'react-router-dom';
// // import MainPage from './MainPage';
// import Header from './Header';
// import Home from './Home';
// // import Login from './Login';
// // import {useNavigate} from "react-router-dom"


// import '../index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';



// const API = "http://127.0.0.1:8888";

// function App() {
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
  

//   return (
//     <>
//       <Header  />
//       <Routes>
//         {/* <Route
//           path="/login"
//           element={<Login API={API} onLogin={onLogin} />}
//         /> */}
//         <Route
//           path="*"
//           element={
//             <Home API={API}  />
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;
