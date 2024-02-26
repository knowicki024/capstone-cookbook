import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


function Categories({ API }) {
 const [recipes, setRecipes] = useState([]);
 const [categoryName, setCategoryName] = useState('');
 const { id } = useParams();


 useEffect(() => {
   fetch(`${API}/categories/${id}`)
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then(data => {
       setRecipes(data.recipes);
       setCategoryName(data.name);
     })
     .catch(error => {
       console.error('Error fetching category recipes:', error);
     });
 }, [API, id]);


 return (
   <div>
     <h2>Recipes in {categoryName}</h2>
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
   </div>
 );
}


export default Categories;