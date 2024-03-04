import React, { useState, useEffect } from 'react';

function Categories(){
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  // Assuming API is defined somewhere globally or imported

  useEffect(() => {
    fetch(`/categories`)
      .then((response) => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error:', error));
  }, []); 

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/categories`, {
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
