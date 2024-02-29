import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Login({ API }) {
  const [user, setuser] = useState();
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/check_session`)
   .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error('Not authenticated');
        }
      })
   .then((user) => setuser(user))
   .catch(() => setuser(null));
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: user, password: password }),
    })
 .then((response) => response.json())
 .then((data) => {
  setuser(data.username);
  navigate('/', { replace: true });
 });
};

return (
  <div>
    <Container>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter username" />
          <Form.Text className="text-muted">
            We'll never share your info with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  </div>
);
}

export default Login;
