import React from "react";
import { render, screen } from "@testing-library/react";
// import '@testing-library/jest-dom/extend-expect'; // Import Jest-DOM for additional matchers
import "@testing-library/jest-dom";
import Notification from "../Components/Popups/Notification";

describe("Notifications Component", () => {
  test("renders the inbox header correctly", () => {
    render(<Notification />);
    expect(screen.getByText("Inbox")).toBeInTheDocument();
    expect(screen.getByText("Archived")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
  });

  test("renders the buttons correctly", () => {
    render(<Notification />);
    expect(screen.getByText("Mark All As Read")).toBeInTheDocument();
    expect(screen.getByText("Archive Read")).toBeInTheDocument();
  });

  test("renders the notifications list correctly", () => {
    render(<Notification />);
    const notifications = [
      {
        name: "Micheal James",
        action: "You have submitted your request.",
        time: "11 hours ago",
        type: "Task List",
      },
      {
        name: "Micheal James",
        action: "You have submitted your request.",
        time: "11 hours ago",
        type: "Task List",
      },
      {
        name: "Micheal James",
        action: "You have submitted your request.",
        time: "11 hours ago",
        type: "Task List",
      },
    ];

    notifications.forEach((notification) => {
      const nameElements = screen.getAllByText(notification.name);
      expect(nameElements.length).toBeGreaterThanOrEqual(1);
      const actionElements = screen.getAllByText(notification.action);
      expect(actionElements.length).toBeGreaterThanOrEqual(1);
      const timeElements = screen.getAllByText(notification.time);
      expect(timeElements.length).toBeGreaterThanOrEqual(1);
      const typeElements = screen.getAllByText(notification.type);
      expect(typeElements.length).toBeGreaterThanOrEqual(1);
    });
  });
});
