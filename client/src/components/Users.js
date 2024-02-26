// src/components/Users.js
import React, { useState, useEffect } from 'react';


function Users() {
 const [users, setUsers] = useState([]);
 const [newUserName, setNewUserName] = useState('');


 useEffect(() => {
   // GET /users
   fetch('/users')
     .then(response => response.json())
     .then(data => setUsers(data))
     .catch(error => console.error('Error fetching users:', error));
 }, []);


 const handleSubmit = (event) => {
   event.preventDefault();
   // POST /users
   fetch('/users', {
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
   <div>
     <h1>Users</h1>
     <ul>
       {users.map(user => <li key={user.id}>{user.name}</li>)}
     </ul>
     <form onSubmit={handleSubmit}>
       <input
         type="text"
         value={newUserName}
         onChange={(e) => setNewUserName(e.target.value)}
         placeholder="Enter new user name"
       />
       <button type="submit">Add User</button>
     </form>
   </div>
 );
}


export default Users;
