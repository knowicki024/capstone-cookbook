import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function RecipeDetail({ API, navigate, refreshRecipes }) {
 const [recipe, setRecipe] = useState(null);
 const { id } = useParams();

 const [formData, setFormData] = useState({
   name: '',
   ingredients: '',
   directions: '',
   category_id: '',
 });

 useEffect(() => {
   fetch(`${API}/recipes/${id}`)
   .then(response => response.json())
   .then(data => {
     setRecipe(data);
     setFormData({
       name: data.name,
       ingredients: data.ingredients,
       directions: data.directions,
       category_id: data.category_id
     });
   })
   .catch(error => console.error('error fetching recipe details'));
 }, [API, id]);


 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData(prevFormData => ({
     ...prevFormData,
     [name]: value
   }));
 };

 const handleUpdate = (event) => {
  event.preventDefault();

  fetch(`${API}/recipes/${id}`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(updatedRecipe => {
    refreshRecipes();
    navigate('/home')
  })
  .catch(error => console.error('There was an error updating the recipe:', error));
 };

 const handleDelete = () => {
  fetch(`${API}/recipes/${id}`, {
    method: 'DELETE',
  })
  .then(() => {
    refreshRecipes(); 
    navigate('/home');
  })
  .catch(error => console.error('There was an error deleting the recipe:', error));
 };

 if (!recipe) {
   return <div>Loading...</div>;
 }

 return (
  <div className="recipe-detail">
    {/* Display Recipe Details */}
    <div className="recipe-display">
      <h2>{recipe.name}</h2>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Directions:</strong> {recipe.directions}</p>
      <p><strong>Category ID:</strong> {recipe.category_id}</p>
    </div>
    
    {/* Edit Form */}
    <div className="recipe-form">
      <form onSubmit={handleUpdate}>
        <h4>Edit Recipe</h4>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Ingredients</label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />
        <label>Directions</label>
        <textarea
          name="directions"
          value={formData.directions}
          onChange={handleChange}
          required
        />
        <label>Category ID</label>
        <input
          type="text"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
        />
        <div>
          <button type="submit">Update Recipe</button>
          <button onClick={handleDelete} style={{marginTop: "10px"}}>Delete Recipe</button>
        </div>
      </form>
    </div>
  </div>
);
}

export default RecipeDetail;
