import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../Components/HomePage/Home'; // Ensure this path is correct

describe('Home Component Tests', () => {
  test('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText('Your dream house is here.')).toBeInTheDocument();
  });
  

  test('allows typing in the search input', () => {
    render(<Home />);
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Montreal' } });
    expect(searchInput.value).toBe('Montreal');
  });

  // Ensure you have a header or banner role in your component for this test to pass
  test('has a header section', () => {
    render(<Home />);
    // If your header doesn't implicitly have the banner role, you may need to adjust this test
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('displays featured properties heading', () => {
    render(<Home />);
    expect(screen.getByText('Featured Properties')).toBeInTheDocument();
    expect(screen.getAllByText('import property info later').length).toBeGreaterThan(0);
  });

  test('has a functioning "Search on Map" button', () => {
    render(<Home />);
    const mapButton = screen.getByText('Search on Map');
    fireEvent.click(mapButton);
    // Verify expected behavior after button click, such as navigation or state change
  });

  test('renders home sections correctly', () => {
    render(<Home />);
    // Verify the presence of dynamically loaded content or specific sections
  });
});
