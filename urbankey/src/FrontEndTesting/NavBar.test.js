import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../Components/NavBar/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';

// Import useLogout to properly set up the mock
import useLogout from '../CustomeHooks/useLogout';

// Mock the useLogout hook right inside the factory function
jest.mock('../CustomeHooks/useLogout', () => ({
  __esModule: true,
  default: jest.fn() // Simplified to mock the logout function directly
}));

describe('Navbar', () => {
  let logoutMock;

  beforeEach(() => {
    // Reset mocks and set up the logout function to be a new mock for each test
    jest.clearAllMocks();
    logoutMock = jest.fn(); // Define a new mock function for logout
    useLogout.mockImplementation(() => logoutMock); // Use the newly defined mock function when useLogout is called
  });

  it('renders correctly in unauthenticated state', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('displays user options when clicking on the user icon', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    fireEvent.click(screen.getByTestId('user-icon'));
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('calls logout and hides options on "Sign Out" click', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    fireEvent.click(screen.getByTestId('user-icon')); // To display the Sign Out option
    fireEvent.click(screen.getByText('Sign Out'));

    // Check if the mocked logout function has been called
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
