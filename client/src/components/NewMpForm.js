import React, { useState } from 'react';

function NewMpForm({ handleSubmitForm, navigate }) {
    const initObject = {
        date: '',
        user_id: '',
        recipe_id: '',
        recipe_name: ''
    };

    const [formData, setFormData] = useState(initObject);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFetchRecipeName = () => {
        if (formData.recipe_id) {
            fetch(`/recipes/${formData.recipe_id}`)
            .then(response => response.json())
            .then(data => {
                // Assuming 'name' is the property that contains the recipe name
                setFormData(prevFormData => ({
                    ...prevFormData,
                    recipe_name: data.name
                }));
            })
            .catch(error => console.error('Error fetching recipe:', error));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { recipe_name, ...submitData } = formData;

        fetch(`/meal_plans`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submitData),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            handleSubmitForm(data);
            navigate('/');
            setFormData(initObject);
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
    };

    return (
        <div className="container mt-3">
            <h1>New Meal Plan</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="user_id" className="form-label">User ID</label>
                    <input
                        type="number"
                        className="form-control"
                        id="user_id"
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recipe_id" className="form-label">Recipe ID</label>
                    <input
                        type="number"
                        className="form-control"
                        id="recipe_id"
                        name="recipe_id"
                        value={formData.recipe_id}
                        onChange={handleChange}
                        onBlur={handleFetchRecipeName}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recipe_name" className="form-label">Recipe Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="recipe_name"
                        name="recipe_name"
                        value={formData.recipe_name}
                        readOnly 
                    />
                </div>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
}

export default NewMpForm;
