import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";

function MealPlanDetail({API}) {
    const [mealPlan, setMealPlan] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`${API}/meal_plans/${id}`)
        .then(response => response.json())
        .then(data => setMealPlan(data))
        .catch(error => console.error('error fetching meal plan'));
    }, [API, id]);

    if (!mealPlan) {
        return <div>Loading...</div>;
    }

    return ( 
        <div className="mp-card-item">
            <h4>Date: {mealPlan.date}</h4>
            <h5>{mealPlan.user_id} 's Meal Plan</h5>
            <h6>Recipes Include: {mealPlan.recipe_id}</h6>
        </div>
    );
}

export default MealPlanDetail;
