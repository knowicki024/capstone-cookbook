import React from 'react';
import MealPlanCards from './MealPlanCards'; 
import RecipeCard from './RecipeCard';

function MainPage({ recipes, mealPlans}) {

    return (
      <div>
        <RecipeCard recipes={recipes} />
        <MealPlanCards mealPlans={mealPlans} />
      </div>
    );
  }

  export default MainPage;