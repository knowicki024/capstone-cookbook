import React, { useState } from 'react';

function NewRecipeForm({ onHandleSubmit, navigate }) {
  const initObj = {
    name: '',
    ingredients: '',
    directions: '',
    image: '',
    category_id: ''
  }

  const [formData, setFormData] = useState(initObj)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/recipes`, { // Ensure you use the `API` variable for the fetch URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      onHandleSubmit(data); // Ensure this is inside the then to wait for the async operation
      navigate('/');
      setFormData(initObj);
    })
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">New Recipe</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="image" className="form-label">Image URL</label>
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default NewRecipeForm;
