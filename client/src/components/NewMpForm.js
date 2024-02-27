import React, { useState } from 'react';

function NewMpForm({ API, handleSubmitForm, navigate }) {
    const initObject = {
        date: '',
        user_id: '',
        recipe_id: '' 
    };

    const [formData, setFormData] = useState(initObject);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${API}/meal_plans`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
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
        <form onSubmit={handleSubmit}>
            <h1>New Meal Plan</h1>
            <div>
                <label>Date</label>
                <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>User ID</label>
                <input
                    type="text"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Recipe ID</label>
                <input
                    type="text"
                    name="recipe_id"
                    value={formData.recipe_id}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default NewMpForm;
