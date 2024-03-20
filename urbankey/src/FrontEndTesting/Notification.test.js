import React from 'react';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // Import Jest-DOM for additional matchers
import '@testing-library/jest-dom';
import Notifications from '../Components/Popups/Notifications';

describe('Notifications Component', () => {
  test('renders the inbox header correctly', () => {
    render(<Notifications />);
    expect(screen.getByText('Inbox')).toBeInTheDocument();
    expect(screen.getByText('Archived')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  test('renders the buttons correctly', () => {
    render(<Notifications />);
    expect(screen.getByText('Mark All As Read')).toBeInTheDocument();
    expect(screen.getByText('Archive Read')).toBeInTheDocument();
  });

  test('renders the notifications list correctly', () => {
    render(<Notifications />);
    const notifications = [
      { name: 'Micheal James', action: 'You have submitted your request.', time: '11 hours ago', type: 'Task List' },
      { name: 'Micheal James', action: 'You have submitted your request.', time: '11 hours ago', type: 'Task List' },
      { name: 'Micheal James', action: 'You have submitted your request.', time: '11 hours ago', type: 'Task List' }
    ];

    notifications.forEach(notification => {
      expect(screen.getByText(notification.name)).toBeInTheDocument();
      expect(screen.getByText(notification.action)).toBeInTheDocument();
      expect(screen.getByText(notification.time)).toBeInTheDocument();
      expect(screen.getByText(notification.type)).toBeInTheDocument();
    });
  });
});
