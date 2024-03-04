import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'; 
function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const submittingObj = { 
      "name": name,
      "password": password
    }
    console.log(submittingObj)

    fetch("http://127.0.0.1:8888/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submittingObj),
      credentials: 'include',
    })
      .then(resp => resp.json())
      .then(loggedInUserFromServer => {
        console.log("loggedInUserFromServer", loggedInUserFromServer)
        onLogin(loggedInUserFromServer)
                
      })
      .catch(console.error)
      
  };

  return (
    <Container>
      {errorMessage && <Alert variant="danger" data-testid="error-message">{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit} data-testid="login-form">
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>User</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={name}
            onChange={e => setName(e.target.value)} data-testid="formGroupEmail"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password}
            onChange={e => setPassword(e.target.value)} data-testid="formBasicPassword"/>
        </Form.Group>
        <Button variant="primary" type="submit" data-testid="submit-button">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;