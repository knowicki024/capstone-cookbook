import React from 'react';
import { Link } from 'react-router-dom';

function MealPlanCards({ mealPlans}) {
    return (
        <div className="mp-container">
            {mealPlans.map((mealPlan, index) => (
                <Link to={`/meal_plans/${mealPlan.id}`} key={index}>
                    <li className="mp-card-item">
                        <h4>{mealPlan.date}</h4>
                        <p>User:{mealPlan.user_id}</p>
                        <p>Recipe:{mealPlan.recipe_id}</p>
                    </li>
                </Link>
            ))}
        </div>

    )
}

export default MealPlanCards;