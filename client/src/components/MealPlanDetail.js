import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function MealPlanDetail({ refreshMealPlans, navigate }) {
    const [mealPlan, setMealPlan] = useState(null);
    const { id } = useParams();

    const [formData, setFormData] = useState({
        date: '',
        user_id: '',
        recipe_id: '',
    });

    useEffect(() => {
        fetch(`/meal_plans/${id}`)
        .then(response => response.json())
        .then(data => {
            setMealPlan(data);
            setFormData({
                date: data.date,
                user_id: data.user_id,
                recipe_id: data.recipe_id,
            });
        })
        .catch(error => console.error('Error fetching meal plan:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
        }));
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        fetch(`/meal_plans/${id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(() => {
            refreshMealPlans();
            navigate('/home');
        })
        .catch(error => console.error('There was an error updating the meal plan:', error));
    };

    const handleDelete = () => {
        fetch(`/meal_plans/${id}`, {
          method: 'DELETE',
        })
        .then(() => {
          refreshMealPlans(); 
          navigate('/home');
        })
        .catch(error => console.error('There was an error deleting the recipe:', error));
       };

    if (!mealPlan) {
        return <div>Loading...</div>;
    }

    return (
        <div className="meal-plan-detail">
          {/* Display Meal Plan Details */}
          <div className="meal-plan-display">
            <h2>Meal Plan ID: {mealPlan.id}</h2>
            <p><strong>Date:</strong> {mealPlan.date}</p>
            <p><strong>User ID:</strong> {mealPlan.user_id}</p>
            <p><strong>Recipe ID:</strong> {mealPlan.recipe_id}</p>
          </div>
          
          {/* Edit Form */}
          <div className="meal-plan-form">
            <form onSubmit={handleUpdate}>
              <h4>Edit Meal Plan</h4>
              <label>Date</label>
              <input
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <label>User ID</label>
              <input 
                type="text"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                required
              />
              <label>Recipe ID</label>
              <input 
                type="text"
                name="recipe_id"
                value={formData.recipe_id}
                onChange={handleChange}
                required
              />
              <div>
                <button type="submit">Update Meal Plan</button>
                <button onClick={handleDelete} style={{marginTop: "10px"}}>Delete Meal Plan</button>

              </div>
            </form>
          </div>
        </div>
    );
}

export default MealPlanDetail;
