import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Reservation from "../Components/Reservation/Reservation";

describe("Reservation Component", () => {
  // Increase timeout for all tests in this describe block
  jest.setTimeout(15000); // Set timeout to 15 seconds

  test("displays facility selection dropdown", () => {
    render(<Reservation />);
    expect(screen.getByText("Select a facility:")).toBeInTheDocument();
  });

  test("displays time slots for selection", async () => {
    render(<Reservation />);
    const timeSlot = screen.getByText("08:00 AM");
    expect(timeSlot).toBeInTheDocument();
    fireEvent.click(timeSlot); // Simulate clicking on a time slot
    await waitFor(() => expect(timeSlot).toHaveClass("selected")); // Wait for the class to be applied
  });

  test("displays date selection calendar", () => {
    render(<Reservation />);
    const selectDateText = screen.getByText("Select a date:");
    expect(selectDateText).toBeInTheDocument();
  });
});


