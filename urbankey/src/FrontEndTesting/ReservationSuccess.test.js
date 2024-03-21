import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReservationSuccess from "../Components/Popups/ReservationSuccess";

describe("SuccessMessage Component", () => {
  test("renders the success message correctly", () => {
    render(<ReservationSuccess />);
    expect(screen.getByText("Congrats!")).toBeInTheDocument();
    expect(
      screen.getByText("Reservation has been successfully made.")
    ).toBeInTheDocument();
  });

  test('calls handleBackHome function when "Back to Home" button is clicked', () => {
    const mockHandleBackHome = jest.fn();
    render(<ReservationSuccess handleBackHome={mockHandleBackHome} />);
    const backButton = screen.getByText("Back to Home");
    fireEvent.click(backButton);
    expect(mockHandleBackHome).toHaveBeenCalledTimes(1);
  });
});
