import React from 'react';
import MealPlanCards from './MealPlanCards'; 
import RecipeCard from './RecipeCard';

function MainPage({ recipes, mealPlans}) {
    return (
      <div>
        <h2 className="mt-4 mb-2 large-header">Recipes</h2>        
        <RecipeCard recipes={recipes} />
        
        <div className="my-4"></div> 

        <h2 className="mt-2 mb-4 large-header">Weekly Meal Plans</h2> 
        <MealPlanCards mealPlans={mealPlans} />
      </div>
    );
}

export default MainPage;
