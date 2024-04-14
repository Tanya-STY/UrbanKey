import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CondoDash from '../Components/CondoOwnerDashboard/OwnerDashboard';
import { BrowserRouter } from 'react-router-dom';

describe('CondoDash Component', () => {
  // Helper function to wrap CondoDash with BrowserRouter since it contains <Link>
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  test('renders the dashboard title', async () => {
    renderWithRouter(<CondoDash />);
   
    const title = await screen.findByText('Single Person House');
    expect(title).toBeInTheDocument();
  });
  
  test('renders the location name', () => {
    renderWithRouter(<CondoDash />);
    expect(screen.getByText('Montreal, QC')).toBeInTheDocument();
  });

  test('renders profile information', () => {
    renderWithRouter(<CondoDash />);
    expect(screen.getByText('Michael James')).toBeInTheDocument();
    expect(screen.getByText('Owner')).toBeInTheDocument();
  });

  test('renders general information correctly', () => {
    renderWithRouter(<CondoDash />);
    expect(screen.getByText('Condo No.')).toBeInTheDocument();
    expect(screen.getByText('0-0002')).toHaveStyle('color: red');
    expect(screen.getByText('Apartment')).toBeInTheDocument();
  });

  test('renders financial status', () => {
    renderWithRouter(<CondoDash />);
    expect(screen.getByText('Financial Status')).toBeInTheDocument();
    expect(screen.getByText('Monthly Condo Fees: $4568')).toBeInTheDocument();
  });

  test('renders maintenance request link', async () => {
    renderWithRouter(<CondoDash />);
    // Use findByText to wait for the element to be available
    const submitRequestLink = await screen.findByText('Submit a New Request');
    expect(submitRequestLink).toBeInTheDocument();
    expect(submitRequestLink).toHaveAttribute('href', '/Maintenance');
  });
  

  // More tests can be added to cover all aspects of the component
});
