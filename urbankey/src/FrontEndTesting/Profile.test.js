import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../Components/ProfilePage/Profile';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import useAuth from '../CustomeHooks/useAuth';

// Mocking modules
jest.mock('axios');
jest.mock('../CustomeHooks/useAuth', () => ({
  useAuth: jest.fn()
}));

// Utility function to render Profile component wrapped with BrowserRouter
const renderProfileWithRouter = () => {
  render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  );
};

describe('Profile Component', () => {
  beforeEach(() => {
    // Mock useAuth hook
    useAuth.mockImplementation(() => ({ auth: { token: 'fake-token' }, setAuth: jest.fn() }));

    // Mock API response
    axios.get.mockResolvedValue({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        province: 'Ontario',
        city: 'Toronto',
        num: '1234567890',
        num2: '0987654321',
        key: 'ABC123',
        address: '123 Main St',
        selectedFile: null,
      },
    });
  });

  test('renders profile information form', async () => {
    renderProfileWithRouter();

    // Check for initial loading state
    await waitFor(() => expect(screen.getByText('Membership Information')).toBeInTheDocument());

    // Check if the fetched data is displayed
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('johndoe@example.com')).toBeInTheDocument();
    // Add more assertions for other fields
  });

  test('updates state on input change', () => {
    renderProfileWithRouter();

    // Simulate input change
    fireEvent.change(screen.getByLabelText(/Name \/ Surname/i), { target: { value: 'Jane Doe' } });

    // Assert the input's value has been updated
    expect(screen.getByLabelText(/Name \/ Surname/i)).toHaveValue('Jane Doe');
  });

  test('submits form with updated information', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Profile updated successfully' } });

    renderProfileWithRouter();

    // Simulate form submission
    fireEvent.click(screen.getByText('Save'));

    // Assert that axios.post was called with expected payload
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ name: 'John Doe' }), expect.anything()));

    // Assert success message or behavior
    // This depends on how your component handles the submission success
  });

  
});
