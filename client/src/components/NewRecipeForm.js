import React, { useState } from 'react';

function NewRecipeForm({ API, onHandleSubmit, navigate }) {
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
    setFormData({...formData, [name] :value})
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(onHandleSubmit)
    navigate('/')
    setFormData(initObj)
}

  return (
    <form onSubmit={handleSubmit}>
        <h1>New Recipe</h1>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Ingredients</label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Directions</label>
        <textarea
          name="directions"
          value={formData.directions}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Image</label>
        <textarea
        name="image"
        value={formData.image}
        onChange={handleChange}
        required
        />
      </div>
      <div>
        <label>Category ID</label>
        <input
          type="number"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewRecipeForm;
