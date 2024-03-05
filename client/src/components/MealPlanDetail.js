import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

function MealPlanDetail({ refreshMealPlans }) {
    const [mealPlan, setMealPlan] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        date: '',
        user_id: '',
        recipe_id: '',
        recipe_name: ''
    });

    const fetchRecipeName = () => {
      if (formData.recipe_id) {
          fetch(`/recipes/${formData.recipe_id}`)
          .then(response => response.json())
          .then(data => {
              setFormData(prevFormData => ({
                  ...prevFormData,
                  recipe_name: data.name
              }));
          })
          .catch(error => console.error('Error fetching recipe:', error));
      }
  };

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
            if (data.recipe_id) fetchRecipeName(data.recipe_id);
        })
        .catch(error => console.error('Error fetching meal plan:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
        }));
        if (name === 'recipe_id') fetchRecipeName(value);
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        const { recipe_name, ...submitData } = formData;
        fetch(`/meal_plans/${id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(() => {
            refreshMealPlans();
            navigate('/');
        })
        .catch(error => console.error('There was an error updating the meal plan:', error));
    };

    const handleDelete = () => {
        fetch(`/meal_plans/${id}`, {
          method: 'DELETE',
        })
        .then(() => {
          refreshMealPlans();
          navigate('/');
        })
        .catch(error => console.error('There was an error deleting the recipe:', error));
       };

    if (!mealPlan) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
          <div className="meal-plan-display mb-4">
            <h2>Meal Plan ID: {mealPlan.id}</h2>
            <p><strong>Date:</strong> {mealPlan.date}</p>
            <p><strong>User ID:</strong> {mealPlan.user_id}</p>
            <p><strong>Recipe ID:</strong> {mealPlan.recipe_id}</p>
          </div>
          
          <div className="meal-plan-form">
            <form onSubmit={handleUpdate}>
              <h4>Edit Meal Plan</h4>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                  type="date" 
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="user_id" className="form-label">User ID</label>
                <input 
                  type="text"
                  className="form-control"
                  id="user_id"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="recipe_id" className="form-label">Recipe ID</label>
                <input 
                  type="text"
                  className="form-control"
                  id="recipe_id"
                  name="recipe_id"
                  value={formData.recipe_id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Recipe Name</label>
                <input 
                  type="text"
                  className="form-control"
                  value={formData.recipe_name}
                  readOnly
            />
              </div>
              <button type="submit" className="btn">Update Meal Plan</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Meal Plan</button>
            </form>
          </div>
        </div>
    );
}

export default MealPlanDetail;

