import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import Users from './Users';
import Categories from './Categories';
import CategoryById from './CategoryById';
import MealPlanDetail from './MealPlanDetail';
import MealPlanCards from './MealPlanCards'; 
import NewRecipeForm from './NewRecipeForm';
import NewMpForm from './NewMpForm';
import { Route, Routes } from "react-router-dom";
import {useNavigate} from "react-router-dom"

const API = "http://127.0.0.1:8888";

function HomePage({ recipes, mealPlans }) {
  return (
    <div>
      <RecipeCard recipes={recipes} />
      <MealPlanCards mealPlans={mealPlans} />
    </div>
  );
}

function Home() {
 const [recipes, setRecipes] = useState([]);
 const [mealPlans, setMealPlans] = useState([]);
 const navigate = useNavigate()

 useEffect(() => {
  fetch(`${API}/meal_plans`)
  .then(response => response.json())
  .then(data => setMealPlans(data))
  .catch(err => console.error('error fetching meal plans'));
 }, []);

 useEffect(() => {
   fetch(`${API}/recipes`)
     .then(response => response.json())
     .then(data => setRecipes(data))
     .catch(err => console.error('error fetching recipes'));
 }, []);

const onHandleSubmit = (newRecipe) => {
  setRecipes([...recipes, newRecipe])
}

const handleSubmitForm = (newMealPlan) => {
  setMealPlans([...mealPlans, newMealPlan])
}

 return (
   <Routes>
     <Route path="/users" element={<Users API={API} />} />
     <Route path="/" element={<HomePage recipes={recipes} mealPlans={mealPlans} />} />
     <Route path="/recipes/:id" element={<RecipeDetail API={API} />} />
     <Route path="/categories/:id" element={<CategoryById API={API} />} />
     <Route path="/categories" element={<Categories API={API} />} />
     <Route path="/meal_plans/:id" element={<MealPlanDetail API={API} />} />
     <Route path="/recipes" element={<NewRecipeForm API={API} onHandleSubmit={onHandleSubmit} navigate={navigate}/>} />
     <Route path="/meal_plans" element={<NewMpForm API={API} handleSubmitForm={handleSubmitForm} navigate={navigate}/>} />
   </Routes>
 );
}

export default Home;
