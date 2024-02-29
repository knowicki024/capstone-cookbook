import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import {useNavigate} from "react-router-dom"

import Users from './Users';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import Categories from './Categories';
import CategoryById from './CategoryById';
import MealPlanDetail from './MealPlanDetail';
import MealPlanCards from './MealPlanCards'; 
import NewRecipeForm from './NewRecipeForm';
import NewMpForm from './NewMpForm';
import Search from './Search';

// import Login from './Login';



function HomePage({ recipes, mealPlans }) {
  return (
    <div>
      <RecipeCard recipes={recipes} />
      <MealPlanCards mealPlans={mealPlans} />
    </div>
  );
}

function Home({API}) {
 const [recipes, setRecipes] = useState([]);
 const [mealPlans, setMealPlans] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
 const navigate = useNavigate()

 useEffect(() => {
  fetch(`${API}/meal_plans`)
  .then(response => response.json())
  .then(data => setMealPlans(data))
  .catch(err => console.error('error fetching meal plans'));
 }, [API]);

 useEffect(() => {
   fetch(`${API}/recipes`)
     .then(response => response.json())
     .then(data => setRecipes(data))
     .catch(err => console.error('error fetching recipes'));
 }, [API]);

const onHandleSubmit = (newRecipe) => {
  setRecipes([...recipes, newRecipe])
}

const handleSubmitForm = (newMealPlan) => {
  setMealPlans([...mealPlans, newMealPlan])
}

const refreshRecipes = () => {
  fetch(`${API}/recipes`)
  .then(response => response.json())
  .then(data => setRecipes(data))
}

const refreshMealPlans = () => {
  fetch(`${API}/meal_plans`)
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
          <HomePage 
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
          API={API} 
        />
      } 
    />
    <Route 
      path="/recipes" 
      element={
        <NewRecipeForm 
          API={API} 
          onHandleSubmit={onHandleSubmit} 
          navigate={navigate}
        />
      } 
    />
    <Route 
      path="/recipes/:id" 
      element={
        <RecipeDetail 
          API={API} 
          navigate={navigate} 
          refreshRecipes={refreshRecipes}
        />
      } 
    />
    <Route 
      path="/categories" 
      element={
        <Categories 
          API={API} 
        />
      } 
    />
    <Route 
      path="/categories/:id" 
      element={
        <CategoryById   
          API={API} 
        />
      } 
    />
    <Route 
      path="/meal_plans" 
      element={
        <NewMpForm 
          API={API} 
          handleSubmitForm={handleSubmitForm} 
          navigate={navigate}
        />
      } 
    />
    <Route 
      path="/meal_plans/:id" 
      element={
        <MealPlanDetail 
          API={API} 
          navigate={navigate}
          refreshMealPlans={refreshMealPlans}
        />
      } 
    />
  </Routes>
);
}

export default Home;
