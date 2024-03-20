// Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Components/LogIn/Login'; 
import axios from 'axios';
import useAuth from '../CustomeHooks/useAuth.js'; 

// Mocking axios for HTTP requests
jest.mock('axios');

// Mocking useAuth custom hook
jest.mock('../CustomeHooks/useAuth', () => ({
  useAuth: jest.fn()
}));

// Mocking navigate function from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useNavigate: () => mockedNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'LOGIN' })).toBeInTheDocument();
  });

  it('allows entering email and password', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password' },
    });

    expect(screen.getByPlaceholderText('Enter your email').value).toBe('test@example.com');
    expect(screen.getByPlaceholderText('Enter your password').value).toBe('password');
  });

  it('submits the form and navigates on successful login', async () => {
    axios.post.mockResolvedValue({
      data: { token: 'fakeToken', role: 'user' },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'LOGIN' }));

    // Assuming you are using async operations
    await expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/Login", expect.anything(), expect.anything());
    expect(mockedNavigate).toHaveBeenCalledWith('/Profile', { replace: true });
  });

  // Additional tests can include error handling, persist checkbox functionality, etc.
});
