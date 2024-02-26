import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


function RecipeDetail({ API }) {
 const [recipe, setRecipe] = useState(null);
 const { id } = useParams();


 useEffect(() => {
   fetch(`${API}/recipes/${id}`)
   .then(response => response.json())
   .then(data => setRecipe(data))
   .catch(error => console.error('error fetching recipe details'));
 }, [API, id]);


 if (!recipe) {
   return <div>Loading...</div>;
 }


 return (
   <div className="card-item">
     <h4>{recipe.name}</h4>
     <ol className="ingredients">{recipe.ingredients}</ol>
     <p>{recipe.directions}</p>
     <h5>Category ID: {recipe.category_id}</h5>
   </div>
 );
}


export default RecipeDetail;