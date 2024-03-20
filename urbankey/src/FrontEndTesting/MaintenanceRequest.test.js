import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // Import Jest-DOM for additional matchers
import '@testing-library/jest-dom';
import MaintenanceRequestForm from '../Components/Popups/MaintenanceRequestForm';

describe('MaintenanceRequestForm Component', () => {
  test('renders the maintenance requests title', () => {
    render(<MaintenanceRequestForm />);
    expect(screen.getByText('Maintenance Requests')).toBeInTheDocument();
  });

  test('allows user to input title and description', () => {
    render(<MaintenanceRequestForm />);
    const titleInput = screen.getByLabelText('Title');
    const descriptionTextarea = screen.getByLabelText('Request Description');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(descriptionTextarea, { target: { value: 'Test Description' } });

    expect(titleInput).toHaveValue('Test Title');
    expect(descriptionTextarea).toHaveValue('Test Description');
  });

  test('submits the form with correct data', () => {
    render(<MaintenanceRequestForm />);
    const titleInput = screen.getByLabelText('Title');
    const descriptionTextarea = screen.getByLabelText('Request Description');
    const submitButton = screen.getByText('Submit Your Request');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(descriptionTextarea, { target: { value: 'Test Description' } });
    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith('Submitted:', { title: 'Test Title', description: 'Test Description' });
  });
});
