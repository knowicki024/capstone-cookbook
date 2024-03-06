import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function MealPlanCards({ mealPlans }) {
    const [mealPlansWithRecipeName, setMealPlansWithRecipeName] = useState([]);

    useEffect(() => {
        const fetchRecipeNames = async () => {
            const updatedMealPlans = await Promise.all(mealPlans.map(async (mealPlan) => {
                const response = await fetch(`/recipes/${mealPlan.recipe_id}`);
                const recipe = await response.json();
                return { ...mealPlan, recipe_name: recipe.name };
            }));
            setMealPlansWithRecipeName(updatedMealPlans);
        };

        if (mealPlans.length > 0) {
            fetchRecipeNames();
        }
    }, [mealPlans]);

    return (
        <Container>
            <Row xs={1} md={2} lg={3} className="g-4">
                {mealPlansWithRecipeName.map((mealPlan, index) => (
                    <Col key={index}>
                        <Card className="h-100">

                            <Card.Body>
                                <Card.Title>Date: {mealPlan.date}</Card.Title>
                                <Card.Text>User ID: {mealPlan.user_id}</Card.Text>
                                <Card.Text>Recipe ID: {mealPlan.recipe_id}</Card.Text>
                                <Card.Text>Recipe Name: {mealPlan.recipe_name}</Card.Text>
                                <Link to={`/meal_plans/${mealPlan.id}`}>
                                    <Button className="btn" variant="primary">View Meal Plan</Button>
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
