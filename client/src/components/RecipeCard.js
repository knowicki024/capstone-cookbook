import React from 'react';
import { Link } from 'react-router-dom';


function RecipeCard({ recipes }) {
 return (
   <div className="card-container">
     {recipes.map((recipe, index) => (
       <Link to={`/recipes/${recipe.id}`} key={index}>
         <li className="card-item">
           <h4>{recipe.name}</h4>
           <ol className="ingredients">{recipe.ingredients}</ol>
           <p>{recipe.directions}</p>
           <h5>Category ID: {recipe.category_id}</h5>
         </li>
       </Link>
     ))}
   </div>
 );
}


export default RecipeCard;




