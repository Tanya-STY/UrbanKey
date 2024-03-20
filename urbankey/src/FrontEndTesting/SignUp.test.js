import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios'; // Mock axios for handling HTTP requests
import { BrowserRouter as Router } from 'react-router-dom'; // Mock react-router-dom for handling navigation
import SignUp from '../Components/SignUp/SignUp'; 

// Mocking useAuth custom hook
jest.mock('../CustomeHooks/useAuth', () => ({
  useAuth: jest.fn()
}));

// Mock axios post method
jest.mock('axios');

describe('SignUp Component', () => {
  test('renders SignUp form correctly', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    // Check if the SignUp form elements are rendered correctly
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Retype password')).toBeInTheDocument();
    expect(screen.getByText('I agree to the Membership Terms')).toBeInTheDocument();
    expect(screen.getByText('I allow UrbanKey to contact me for marketing and promotional purposes.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  test('submits SignUp form with valid data', async () => {
    axios.post.mockResolvedValueOnce({ data: { token: 'mock-token', role: 'user' } });

    render(
      <Router>
        <SignUp />
      </Router>
    );

    // Fill in the SignUp form fields
    fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Retype password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('I agree to the Membership Terms'));
    fireEvent.click(screen.getByText('I allow UrbanKey to contact me for marketing and promotional purposes.'));
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    // Wait for the form submission
    await waitFor(() => expect(axios.post).toHaveBeenCalled());

    // Check if the navigation to the Profile page is triggered after successful SignUp
    expect(screen.getByText('Profile Page')).toBeInTheDocument();
  });
});
