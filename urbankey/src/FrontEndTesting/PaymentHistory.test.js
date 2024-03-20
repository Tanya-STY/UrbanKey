import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PaymentHistory from "../Components/Popups/PaymentHistory";

describe('PaymentHistory Component', () => {
  test('renders payment history title and table headers', () => {
    render(<PaymentHistory />);
    expect(screen.getByText('Payment History')).toBeInTheDocument();
    expect(screen.getByText('Payment Date')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Payment Method')).toBeInTheDocument();
    expect(screen.getByText('Reference Number')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  test('renders payment details correctly', () => {
    render(<PaymentHistory />);
    // Test for the presence of a specific payment detail
    expect(screen.getByText('September 2023')).toBeInTheDocument();
    expect(screen.getByText('$4568.00')).toBeInTheDocument();
    expect(screen.getByText('Bank Transfer')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('Paid')).toBeInTheDocument();
  });

  test('checks for correct status class names', () => {
    render(<PaymentHistory />);
    // Verify that the status class names are correctly applied
    expect(screen.getByText('Paid')).toHaveClass('paid');
    expect(screen.getByText('Pending')).toHaveClass('pending');
    expect(screen.getByText('Rejected')).toHaveClass('rejected');
  });

  test('renders buttons for navigation and viewing invoices', () => {
    render(<PaymentHistory />);
    expect(screen.getByText('Go Back')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
    expect(screen.getByText('See Invoices')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'See Invoices' })).toBeInTheDocument();
  });
});
