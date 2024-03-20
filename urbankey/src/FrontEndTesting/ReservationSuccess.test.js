import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // Import Jest-DOM for additional matchers
import '@testing-library/jest-dom';
import SuccessMessage from '../Components/Popups/SuccessMessage';

describe('SuccessMessage Component', () => {
  test('renders the success message correctly', () => {
    render(<SuccessMessage />);
    expect(screen.getByText('Congrats!')).toBeInTheDocument();
    expect(screen.getByText('Reservation has been successfully made.')).toBeInTheDocument();
  });

  test('calls handleBackHome function when "Back to Home" button is clicked', () => {
    const mockHandleBackHome = jest.fn();
    render(<SuccessMessage handleBackHome={mockHandleBackHome} />);
    const backButton = screen.getByText('Back to Home');
    fireEvent.click(backButton);
    expect(mockHandleBackHome).toHaveBeenCalledTimes(1);
  });
});
