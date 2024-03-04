import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CategoryById() {
  const [category, setCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/categories/${id}`)
      .then(response => response.json())
      .then(data => {
        setCategory(data);
        if (data.recipes) {
          setRecipes(data.recipes);
        }
      })
      .catch(error => {
        console.error('Error fetching category details:', error);
      });
  }, [ id]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Recipes in {category ? category.name : 'this category'}</h2>
      {recipes.length > 0 ? (
        <div className="list-group">
          {recipes.map(recipe => (
            <div key={recipe.id} className="list-group-item">
              <h3 className="mb-1">{recipe.name}</h3>
              <p className="mb-1"><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p className="mb-1"><strong>Directions:</strong> {recipe.directions}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found in this category.</p>
      )}
    </div>
  );
}

export default CategoryById;
