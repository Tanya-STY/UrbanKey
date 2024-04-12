import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PaymentHistory from "../Components/Popups/PaymentHistory";

describe('PaymentHistory Component', () => {
  test('renders payment history title and table headers', async () => {
    render(<PaymentHistory />);
    expect(await screen.findByText('Payment History')).toBeInTheDocument();
    expect(await screen.findByText('Payment Date')).toBeInTheDocument();
    expect(await screen.findByText('Amount')).toBeInTheDocument();
    expect(await screen.findByText('Payment Method')).toBeInTheDocument();
    expect(await screen.findByText('Reference Number')).toBeInTheDocument();
    expect(await screen.findByText('Status')).toBeInTheDocument();
  });

  test('renders payment details correctly', async () => {
    render(<PaymentHistory />);
    // Await the presence of a specific payment detail to ensure all async operations have completed
    await screen.findByText('September 2023');
    const amounts = await screen.findAllByText('$4568.00');
    expect(amounts.length).toBeGreaterThanOrEqual(1); // Adjust according to expected occurrences
    await screen.findByText('Bank Transfer');
    await screen.findByText('12345');
    await screen.findByText('Paid');
  });
  

  test('checks for correct status class names', async () => {
    render(<PaymentHistory />);
    const paidStatus = await screen.findByText('Paid');
    expect(paidStatus).toHaveClass('paid');
    const pendingStatus = await screen.findByText('Pending');
    expect(pendingStatus).toHaveClass('pending');
    const rejectedStatus = await screen.findByText('Rejected');
    expect(rejectedStatus).toHaveClass('rejected');
  });
  

  test('renders buttons for navigation and viewing invoices', async () => {
    render(<PaymentHistory />);
    expect(await screen.findByText('Go Back')).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Go Back' })).toBeInTheDocument();
    expect(await screen.findByText('See Invoices')).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'See Invoices' })).toBeInTheDocument();
  });
});
