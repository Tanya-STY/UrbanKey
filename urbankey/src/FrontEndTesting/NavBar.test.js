import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from '../Components/NavBar/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';

// Define the useLogoutMock
const useLogoutMock = jest.fn();

// Mock the useAuth hook right inside the factory function
jest.mock('../CustomeHooks/useAuth', () => ({
  __esModule: true,
  default: () => ({ auth: null, persist: false }), // Mock return value
}));

// Mock the useLogout hook right inside the factory function
jest.mock('../CustomeHooks/useLogout', () => ({
  __esModule: true,
  default: () => useLogoutMock,
}));

const renderNavbar = () =>
  render(
    <Router>
      <Navbar />
    </Router>
  );

describe('Navbar', () => {
  it('renders correctly in unauthenticated state', () => {
    renderNavbar();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('displays user options when clicking on the user icon', () => {
    renderNavbar();
    fireEvent.click(screen.getByTestId('user-icon'));
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('calls logout and hides options on "Sign Out" click', () => {
    renderNavbar();
    fireEvent.click(screen.getByTestId('user-icon'));
    fireEvent.click(screen.getByText('Sign Out'));
    expect(useLogoutMock).toHaveBeenCalledTimes(1);
   
  });
});
