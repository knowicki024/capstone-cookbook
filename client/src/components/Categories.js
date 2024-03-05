import React, { useState, useEffect } from 'react';


function Categories(){
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');


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
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <label htmlFor="newCategoryName" className="form-label">New Category Name:</label>
          <input
            type="text"
            className="form-control"
            id="newCategoryName"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Category</button>
      </form>
      <ul className="list-group">
        {categories.map(category => <li key={category.id} className="list-group-item">{category.name}</li>)}
      </ul>
    </div>
  );
}

export default Categories;
