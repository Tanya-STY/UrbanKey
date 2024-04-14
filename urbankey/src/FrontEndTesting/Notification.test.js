import React from "react";
import { render, screen } from "@testing-library/react";
// import '@testing-library/jest-dom/extend-expect'; // Import Jest-DOM for additional matchers
import "@testing-library/jest-dom";
import Notification from '../Components/Popups/Notification';

describe('Notifications Component', () => {
  test('renders the notifications list correctly', () => {
    render(<Notification />);

    // Sample data structure you might be testing against
    const notifications = [
      { name: "Micheal James", action: "You have submitted your request.", time: "11 hours ago", type: "Task List" },
      { name: "Micheal James", action: "You have submitted your request.", time: "11 hours ago", type: "Task List" },
      { name: "Micheal James", action: "You have submitted your request.", time: "11 hours ago", type: "Task List" }
    ];

    notifications.forEach((notification) => {
      const nameElements = screen.getAllByText(notification.name);
      expect(nameElements.length).toBeGreaterThan(0); // Check that elements are found
      nameElements.forEach(nameElement => {
        expect(nameElement).toBeInTheDocument();
      });

      const actionElements = screen.getAllByText(notification.action);
      expect(actionElements.length).toBeGreaterThan(0); // Check that elements are found
      actionElements.forEach(actionElement => {
        expect(actionElement).toBeInTheDocument();
      });

      const timeElements = screen.getAllByText(notification.time);
      expect(timeElements.length).toBeGreaterThan(0); // Check that elements are found
      timeElements.forEach(timeElement => {
        expect(timeElement).toBeInTheDocument();
      });

      const typeElements = screen.getAllByText(notification.type);
      expect(typeElements.length).toBeGreaterThan(0); // Check that elements are found
      typeElements.forEach(typeElement => {
        expect(typeElement).toBeInTheDocument();
      });
    });
  });
});