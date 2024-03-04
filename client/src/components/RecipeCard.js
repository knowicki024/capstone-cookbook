import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function RecipeCard({ recipes }) {
    return (
        <Container>
            <Row xs={1} md={2} lg={3} className="g-4">
                {recipes.map((recipe, index) => (
                    <Col key={index}>
                        <Card className="h-100">
                            <Card.Img 
                                variant="top" 
                                src={recipe.image || 'default-image-url.jpg'} 
                                className="img-fluid"
                                style={{ objectFit: 'cover', height: '200px' }} 
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
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default RecipeCard;
