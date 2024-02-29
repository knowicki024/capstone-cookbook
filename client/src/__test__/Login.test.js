import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../components/Login';

// Mock fetch globally
global.fetch = jest.fn();

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  fetch.mockClear();
});

const setup = () => {
  const utils = render(<Login onLogin={() => {}} API="http://fakeapi.com" />);
  const usernameInput = utils.getByLabelText('Username');
  const passwordInput = utils.getByLabelText('Password');
  const submitButton = utils.getByRole('button', { name: /login/i });
  return {
    usernameInput,
    passwordInput,
    submitButton,
    ...utils,
  };
};

test('renders and can submit credentials', async () => {
  const { usernameInput, passwordInput, submitButton } = setup();

  // Mock successful login
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1, name: 'User' }),
  });

  userEvent.type(usernameInput, 'testuser');
  userEvent.type(passwordInput, 'password');
  userEvent.click(submitButton);

  expect(fetch).toHaveBeenCalledWith('http://fakeapi.com/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: 'testuser', password: 'password' }),
  });
});

test('displays error on failure', async () => {
  const { usernameInput, passwordInput, submitButton } = setup();

  // Mock failed login
  fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ error: 'Invalid credentials' }),
  });

  userEvent.type(usernameInput, 'testuser');
  userEvent.type(passwordInput, 'wrongpassword');
  userEvent.click(submitButton);

  await waitFor(() => screen.getByText('Invalid credentials'));

  expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
});

test('button shows loading state', async () => {
  const { usernameInput, passwordInput, submitButton } = setup();

  userEvent.type(usernameInput, 'testuser');
  userEvent.type(passwordInput, 'password');
  fireEvent.click(submitButton);

  expect(submitButton).toHaveTextContent('Loading...');
  expect(submitButton).toBeDisabled();
});

// Add more tests as needed
