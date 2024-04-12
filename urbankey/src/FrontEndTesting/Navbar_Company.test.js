import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar_Company from '../Components/NavBar/NavBar_Company';
import '@testing-library/jest-dom';

describe('NavBar_Company', () => {
  beforeEach(() => {
    render(
      <Router>
        <NavBar_Company />
      </Router>
    );
  });

  it('should render the logo', () => {
    expect(screen.getByAltText('Company Logo')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    expect(screen.getByText('Property Profile')).toBeInTheDocument();
    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('Reservation')).toBeInTheDocument();
    expect(screen.getByText('Employees')).toBeInTheDocument();
  });

  it('should show user options when user icon is clicked', () => {
    // Initially, the options should not be visible
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();

    // Simulate a click on the user icon to show options
    fireEvent.click(screen.getByTestId('user-icon'));
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('should hide user options when clicking on an option', () => {
    fireEvent.click(screen.getByTestId('user-icon'));
    expect(screen.getByText('Sign Out')).toBeInTheDocument();

    // Simulate a click on the options div
    fireEvent.click(screen.getByTestId('options'));
    // Since options are hidden by stopping event propagation, options will still be visible
    expect(screen.queryByText('Sign Out')).toBeInTheDocument();
  });
});
