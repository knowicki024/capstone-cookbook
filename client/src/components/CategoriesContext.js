// // CategoriesContext.js
// import React, { createContext, useState, useContext } from 'react';

// const CategoriesContext = createContext();

// export const useCategories = () => useContext(CategoriesContext);

// export const CategoriesProvider = ({ children }) => {
//   const [categories, setCategories] = useState([]);

//   const addCategory = (category) => {
//     setCategories((prevCategories) => [...prevCategories, category]);
//   };

//   return (
//     <CategoriesContext.Provider value={{ categories, addCategory }}>
//       {children}
//     </CategoriesContext.Provider>
//   );
// };
