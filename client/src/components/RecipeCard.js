import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function RecipeCard({ recipes }) {
    return (
        <Container className="d-flex flex-wrap justify-content-start">
            {recipes.map((recipe, index) => (
                <Card key={index} className="m-2" style={{ width: '18rem' }}>
                    <Card.Img 
                        variant="top" 
                        src={recipe.image || 'default-image-url.jpg'} 
                        className="img-fluid"
                        style={{ objectFit: 'contain', height: '200px' }} // Adjust height as needed
                    />
                    <Card.Body>
                        <Card.Title>{recipe.name}</Card.Title>
                        <div>
                            <ul className="ingredients">
                                {Array.isArray(recipe.ingredients) ? recipe.ingredients.map((ingredient, i) => (
                                    <li key={i}>{ingredient}</li>
                                )) : <li>{recipe.ingredients}</li>}
                            </ul>
                        </div>
                        <Card.Text>{recipe.directions}</Card.Text>
                        <Card.Footer>
                            <small className="text-muted">Category ID: {recipe.category_id}</small>
                        </Card.Footer>
                        <Link to={`/recipes/${recipe.id}`}>
                            <Button variant="primary">View Recipe</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}

export default RecipeCard;
