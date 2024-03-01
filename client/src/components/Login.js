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

    fetch(`/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name,
      password: password}),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401 || response.status === 500) {
          throw new Error('Invalid name or password');
        }
      })
      .then((user) => {
        onLogin(user);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <Container>
      {errorMessage && <Alert variant="danger" data-testid="error-message">{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit} data-testid="login-form">
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Username</Form.Label>
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