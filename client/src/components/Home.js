import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import {useNavigate} from "react-router-dom"

import Users from './Users';
import RecipeDetail from './RecipeDetail';
import Categories from './Categories';
import CategoryById from './CategoryById';
import MealPlanDetail from './MealPlanDetail';
import NewRecipeForm from './NewRecipeForm';
import NewMpForm from './NewMpForm';
import Search from './Search';
import MainPage from './MainPage';


// const API = "http://127.0.0.1:8888";


function Home() {
 const [recipes, setRecipes] = useState([]);
 const [mealPlans, setMealPlans] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
 const navigate = useNavigate()

 useEffect(() => {
  fetch(`/meal_plans`)
  .then(response => response.json())
  .then(data => setMealPlans(data))
  .catch(err => console.error('error fetching meal plans'));
 }, []);

useEffect(() => {
   fetch(`/recipes`)
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
const refreshRecipes = () => {
  fetch(`/recipes`)
  .then(response => response.json())
  .then(data => setRecipes(data))
}
const refreshMealPlans = () => {
  fetch(`/meal_plans`)
  .then(response => response.json())
  .then(data => setMealPlans(data))
}
const searchRecipes = recipes.filter(recipe => {
  return recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         recipe.category.name.toLowerCase().includes(searchTerm.toLowerCase());
});
const handleSearch = (e) => {
  setSearchTerm(e.target.value)
}
return (
  <Routes>
    <Route 
      path="/" 
      element={
        <>
          <Search 
            onSearch={handleSearch}
          />
          <MainPage 
            recipes={searchRecipes} 
            mealPlans={mealPlans} 
          />
        </>
      } 
    />
    <Route 
      path="/users" 
      element={
        <Users 
        />
      } 
    />
    <Route 
      path="/recipes" 
      element={
        <NewRecipeForm 
          onHandleSubmit={onHandleSubmit} 
          navigate={navigate}
        />
      } 
    />
    <Route 
      path="/recipes/:id" 
      element={
        <RecipeDetail 
          navigate={navigate} 
          refreshRecipes={refreshRecipes}
        />
      } 
    />
    <Route 
      path="/categories" 
      element={
        <Categories 
        />
      } 
    />
    <Route 
      path="/categories/:id" 
      element={
        <CategoryById   
        />
      } 
    />
    <Route 
      path="/meal_plans" 
      element={
        <NewMpForm 
          handleSubmitForm={handleSubmitForm} 
          navigate={navigate}
        />
      } 
    />
    <Route 
      path="/meal_plans/:id" 
      element={
        <MealPlanDetail 
          navigate={navigate}
          refreshMealPlans={refreshMealPlans}
        />
      } 
    />
  </Routes>
);
}
export default Home;