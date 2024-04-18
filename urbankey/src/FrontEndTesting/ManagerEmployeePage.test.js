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

  //   test('filters rows based on search input', async () => {
  //     const searchInput = screen.getByPlaceholderText('Search Employee by name, role, ID, or any related keywords');
  //     fireEvent.change(searchInput, { target: { value: 'John' } });

  //     await waitFor(() => {
  //       const filteredRows = screen.getAllByRole('row', { name: /row/i });
  //       expect(filteredRows.length).toBeGreaterThan(0);
  //     });
  //   });

  //   test('handles click event on employee type buttons', async () => {
  //     const allEmployeesButton = screen.getByText('All Employees');
  //     fireEvent.click(allEmployeesButton);
  //     expect(allEmployeesButton.classList.contains('active')).toBeTruthy();

  //     const rolesButton = screen.getByText('Roles');
  //     fireEvent.click(rolesButton);
  //     expect(rolesButton.classList.contains('active')).toBeTruthy();

  //     const requestButton = screen.getByText('Request');
  //     fireEvent.click(requestButton);
  //     expect(requestButton.classList.contains('active')).toBeTruthy();
  //   });

  test('handles click event on filter button', () => {
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);
    // Assert filter functionality if implemented
  });

  test('filters rows based on search input', async () => {
    const searchInput = screen.getByPlaceholderText('Search Employee by name, role, ID, or any related keywords');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });


  test('displays no results message when search finds no matches', async () => {
    const searchInput = screen.getByPlaceholderText('Search Employee by name, role, ID, or any related keywords');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent Name' } });

    await waitFor(() => {
        expect(screen.queryByText('No results found')).not.toBeNull();
    });
});


  test('changes state when different employee type buttons are clicked', () => {
    const allEmployeesButton = screen.getByText('All Employees');
    fireEvent.click(allEmployeesButton);
    expect(allEmployeesButton).toHaveClass('active');

    const rolesButton = screen.getByText('Roles');
    fireEvent.click(rolesButton);
    expect(rolesButton).toHaveClass('active');
    expect(allEmployeesButton).not.toHaveClass('active');  
  });


  test('only displays the filter icon when there are items to filter', () => {
    expect(screen.queryByTestId('filter-icon')).toBeNull(); 
    fireEvent.click(screen.getByText('Request'));
    expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
  });

  test('displays an error message when the data fetch fails', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch'));
    render(<DataGridDemo />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    });
  });


  test('search interacts correctly with the data grid', async () => {
    const searchInput = screen.getByPlaceholderText('Search Employee by name, role, ID, or any related keywords');
    fireEvent.change(searchInput, { target: { value: 'Jane' } });
    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getAllByRole('row')).toHaveLength(1);
    });
  });

});
