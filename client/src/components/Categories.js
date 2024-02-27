import React, { useState, useEffect } from 'react';

function Categories({API}){
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  // Assuming API is defined somewhere globally or imported

  useEffect(() => {
    fetch(`${API}/categories`)
      .then((response) => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error:', error));
  }, [API]); 

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${API}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCategory }),
    })
    .then(response => response.json())
    .then(category => {
      setCategories([...categories, category]);
      setNewCategory('');
    })
    .catch(error => console.error('Error adding category:', error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          New Category Name:
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </label>
        <button type="submit">Add Category</button>
      </form>
      <ul>
        {categories.map(category => <li key={category.id}>{category.name}</li>)}
      </ul>
    </div>
  );
}

export default Categories;
