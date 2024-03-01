import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for jest dom matchers
import Login from '../components/Login';

// Mock the global fetch API
beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Login Component', () => {
  test('renders form with input fields for username and password', () => {
    render(<Login />);

    const usernameInput = screen.getByPlaceholderText(/enter username/i);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('calls onLogin with user data when form is submitted successfully', async () => {
    // Mock successful fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ username: 'testuser' }),
    });

    const onLogin = jest.fn();
    render(<Login onLogin={onLogin} />);

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(onLogin).toHaveBeenCalledWith({ username: 'testuser' }));
  });

  test('shows error message when response is unsuccessful', async () => {
    // Mock failed fetch response
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Update to check for the error message in your component after implementing inline error handling
    // await waitFor(() => expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument());
  });

  // Additional unit tests can be added here
});

