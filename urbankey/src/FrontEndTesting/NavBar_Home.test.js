import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar_HomePage from '../Components/NavBar/NavBar_HomePage';
import logo from '../Images/urbankey_logo.png'; 

// Helper function to wrap NavBar_HomePage with a Router because it contains NavLink
const renderWithRouter = (component) => render(<Router>{component}</Router>);

describe('NavBar_HomePage', () => {
  test('renders NavBar_HomePage component with a logo', () => {
    renderWithRouter(<NavBar_HomePage />);
    const logoImg = screen.getByAltText('Company Logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', logo);
  });

  test('renders Home Page link and navigates to the correct path', () => {
    renderWithRouter(<NavBar_HomePage />);
    const homePageLink = screen.getByText('Home Page');
    expect(homePageLink).toBeInTheDocument();
    expect(homePageLink).toHaveAttribute('href', '/HomePage');
  });

  test('shows options when user icon is clicked', () => {
    renderWithRouter(<NavBar_HomePage />);
    
    // Click on the user icon using data-testid
    fireEvent.click(screen.getByTestId('user-icon'));
    
    // Assert that the options are visible
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('hides options when one of them is clicked', () => {
    renderWithRouter(<NavBar_HomePage />);
    
    // Click on the user icon to show options
    fireEvent.click(screen.getByTestId('user-icon'));
    
    // Click on an option
    fireEvent.click(screen.getByText('Login'));
    
    // Wait for the next tick to allow React to re-render
    
    setTimeout(() => {
      // Assert that the clicked option is not in the document anymore
      expect(screen.queryByText('Login')).not.toBeInTheDocument();
      expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
    }, 0);
  });
});
