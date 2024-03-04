import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function MealPlanCards({ mealPlans }) {
    return (
        <Container>
            <Row xs={1} md={2} lg={3} className="g-4"> {/* Adjust the number of columns per row as per your design requirements */}
                {mealPlans.map((mealPlan, index) => (
                    <Col key={index}>
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Date: {mealPlan.date}</Card.Title>
                                <Card.Text>
                                    User ID: {mealPlan.user_id}
                                </Card.Text>
                                <Card.Text>
                                    Recipe ID: {mealPlan.recipe_id}
                                </Card.Text>
                                <Link to={`/meal_plans/${mealPlan.id}`}>
                                    <Button variant="primary">View Meal Plan</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default MealPlanCards;
