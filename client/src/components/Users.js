// src/components/Users.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap CSS

function Users() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    // GET /users
    fetch(`/users`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // POST /users
    fetch(`/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newUserName }),
    })
    .then(response => response.json())
    .then(user => {
      setUsers([...users, user]);
      setNewUserName('');
    })
    .catch(error => console.error('Error adding user:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Users</h1>
      <ul className="list-group mb-3">
        {users.map(user => <li key={user.id} className="list-group-item">{user.name}</li>)}
      </ul>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter new user name"
          />
          <button className="btn" type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
}

export default Users;
