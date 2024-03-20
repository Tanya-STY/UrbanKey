import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // Import Jest-DOM for additional matchers
import '@testing-library/jest-dom';
import Reservation from '../Components/Reservation/Reservation';

describe('Reservation Component', () => {
  test('renders the main title correctly', () => {
    render(<Reservation />);
    expect(screen.getByText('Facility Reservation System')).toBeInTheDocument();
  });

  test('displays facility selection dropdown', () => {
    render(<Reservation />);
    expect(screen.getByText('Select a facility:')).toBeInTheDocument();
  });

  test('displays time slots for selection', () => {
    render(<Reservation />);
    const timeSlot = screen.getByText('08:00 AM');
    expect(timeSlot).toBeInTheDocument();
    fireEvent.click(timeSlot); // Simulate clicking on a time slot
    expect(timeSlot).toHaveClass('selected'); // Expect the selected time slot to have the 'selected' class
  });

  test('displays date selection calendar', () => {
    render(<Reservation />);
    const selectDateText = screen.getByText('Select a date:');
    expect(selectDateText).toBeInTheDocument();
  });

  test('displays error message when submitting without selecting facility, date, or time', () => {
    render(<Reservation />);
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton); // Simulate clicking on the submit button without selecting anything
    expect(screen.getByText('Please select a facility')).toBeInTheDocument();
    expect(screen.getByText('Please select a date')).toBeInTheDocument();
    expect(screen.getByText('Please select a time')).toBeInTheDocument();
  });

  // You can add more tests to cover other functionalities of the component
});
