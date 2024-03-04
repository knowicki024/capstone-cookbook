import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CategoryById(  ) {
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
    <div>
        <>
          <h2>Recipes in {category ? category.name : 'this category'}</h2>
          {recipes.length > 0 ? (
            <ul>
              {recipes.map(recipe => (
                <li key={recipe.id}>
                  <h3>{recipe.name}</h3>
                  <p>{recipe.ingredients}</p>
                  <p>{recipe.directions}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recipes found in this category.</p>
          )}
        </>
    </div>
  );
}
export default CategoryById;
