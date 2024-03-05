import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function RecipeDetail({ navigate, refreshRecipes }) {
 const [recipe, setRecipe] = useState(null);
 const { id } = useParams();

 const [formData, setFormData] = useState({
   name: '',
   ingredients: '',
   directions: '',
   image: '',
   category_id: '',
 });

 useEffect(() => {
   fetch(`/recipes/${id}`)
   .then(response => response.json())
   .then(data => {
     setRecipe(data);
     setFormData({
       name: data.name,
       ingredients: data.ingredients,
       directions: data.directions,
       image: data.image,
       category_id: data.category_id
     });
   })
   .catch(error => console.error('error fetching recipe details'));
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

  fetch(`/recipes/${id}`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(() => {
    refreshRecipes();
    navigate('/');
  })
  .catch(error => console.error('There was an error updating the recipe:', error));
 };

 const handleDelete = () => {
  fetch(`/recipes/${id}`, {
    method: 'DELETE',
  })
  .then(() => {
    refreshRecipes(); 
    navigate('/');
  })
  .catch(error => console.error('There was an error deleting the recipe:', error));
 };

 if (!recipe) {
   return <div>Loading...</div>;
 }

 return (
  <div className="container mt-4">
    {/* Display Recipe Details */}
    <div className="mb-4">
      <h2>{recipe.name}</h2>
      <p><strong>Image:</strong> <img src={recipe.image} alt={recipe.name} className="img-fluid" /></p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Directions:</strong> {recipe.directions}</p>
      <p><strong>Category ID:</strong> {recipe.category_id}</p>
    </div>
    
    {/* Edit Form */}
    <div>
      <h4>Edit Recipe</h4>
      <form onSubmit={handleUpdate} className="mb-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">Ingredients</label>
          <textarea
            className="form-control"
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="directions" className="form-label">Directions</label>
          <textarea
            className="form-control"
            id="directions"
            name="directions"
            value={formData.directions}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category_id" className="form-label">Category ID</label>
          <input
            type="number"
            className="form-control"
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Update Recipe</button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Recipe</button>
      </form>
    </div>
  </div>
);
}

export default RecipeDetail;
