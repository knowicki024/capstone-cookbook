import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import Users from './Users';
import Categories from './Categories';
import { Route, Routes } from "react-router-dom";


const API = "http://127.0.0.1:8888";


function Home() {
 const [recipes, setRecipes] = useState([]);


 useEffect(() => {
   fetch(`${API}/recipes`)
     .then(response => response.json())
     .then(data => setRecipes(data))
     .catch(err => console.error('error fetching recipes'));
 }, []);


 return (
   <Routes>
     <Route path="/users" element={<Users />} />
     <Route path="/" element={<RecipeCard recipes={recipes} />} />
     <Route path="/recipes/:id" element={<RecipeDetail API={API} />} />
     <Route path="categories/:id/recipes" element={<Categories API={API} />} />
   </Routes>
 );
}


export default Home;