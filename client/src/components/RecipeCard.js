import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

function RecipeCard({ recipes }) {
    return (
        <Container>
            <Carousel interval={2000}>
                {recipes.map((recipe, index) => (
                    <Carousel.Item key={index}>
                        <Card className="h-100">
                            <Card.Img 
                                variant="top" 
                                src={recipe.image || 'default-image-url.jpg'} 
                                className="img-fluid"
                                style={{ objectFit: 'contain', height: '600px' }} 
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
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
}

export default RecipeCard;
