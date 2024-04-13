import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DataGridDemo from '../Components/ManagerEmployeePage/ManagerEmployeePage';

describe('DataGridDemo component', () => {
  beforeEach(() => {
    render(<DataGridDemo />);
  });

  test('renders with correct heading', () => {
    expect(screen.getByText('Hello manager,')).toBeInTheDocument();
  });

  test('renders search input field', () => {
    expect(
      screen.getByPlaceholderText('Search Employee by name, role, ID, or any related keywords')
    ).toBeInTheDocument();
  });

  test('renders employee types buttons', () => {
    expect(screen.getByText('All Employees')).toBeInTheDocument();
    expect(screen.getByText('Roles')).toBeInTheDocument();
    expect(screen.getByText('Request')).toBeInTheDocument();
  });

  test('renders filter button', () => {
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  test('renders DataGrid with rows', () => {
    expect(screen.getByRole('grid')).toBeInTheDocument();
    const rows = screen.getAllByRole('row', { name: /row/i });
    expect(rows.length).toBeGreaterThan(0);
  });

  test('handles click event on filter button', () => {
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);
  });

  test('filters rows based on search input', async () => {
    const searchInput = screen.getByPlaceholderText('Search Employee by name, role, ID, or any related keywords');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    await waitFor(() => {
      expect(screen.findAllByText('John Doe')).not.toBeNull();
    });
  });
  
});
