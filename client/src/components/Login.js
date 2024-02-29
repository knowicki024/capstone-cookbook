import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Login({ onLogin, API }) { // Ensure the API prop is used here
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`${API}/login`, { // Use the full API path
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: username, password }), // Ensure the body keys match your backend expectations
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors([err.error])); // Adjusted for expected error format
      }
    }).catch(() => {
      setIsLoading(false);
      setErrors(['Network error']);
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
        {errors.length > 0 && (
          <Form.Text className="text-danger">
            {errors.map((err, index) => (
              <div key={index}>{err}</div> // Changed to <div> for possible multiline errors
            ))}
          </Form.Text>
        )}
      </Form>
    </Container>
  );
}

export default Login;
