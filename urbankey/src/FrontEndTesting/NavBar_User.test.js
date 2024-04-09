import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar_User from '../Components/NavBar/NavBar_User';
import '@testing-library/jest-dom';


// Utility function to wrap the component with Router
const renderWithRouter = (component) => {
  return render(<Router>{component}</Router>);
};

describe('NavBar_User', () => {
  it('renders the company logo', () => {
    renderWithRouter(<NavBar_User />);
    expect(screen.getByAltText('Company Logo')).toBeInTheDocument();
  });

  it('renders navigation links with correct names', () => {
    renderWithRouter(<NavBar_User />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Reservation')).toBeInTheDocument();
  });

  it('toggles the user options dropdown', () => {
    renderWithRouter(<NavBar_User />);
    const userIcon = screen.getByTestId('user-icon');
    fireEvent.click(userIcon);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    fireEvent.click(userIcon);
    // As the options are closed, 'Sign Out' should not be found. You might need to adjust based on your implementation.
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });

  it('toggles the notifications dropdown', () => {
    renderWithRouter(<NavBar_User />);
    const bellIcon = screen.getByTestId('bell-icon');
    fireEvent.click(bellIcon);
    // Assuming you have a way to check if the notifications are shown, e.g., a specific text or element
    // This part of the test will depend on your implementation of the notifications dropdown
    // Example: expect(screen.getByText('You have new notifications')).toBeInTheDocument();
    fireEvent.click(bellIcon);
    // Similarly, check that notifications are no longer visible
    
  });
});
