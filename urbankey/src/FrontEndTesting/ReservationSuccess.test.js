import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// import '@testing-library/jest-dom/extend-expect'; // Import Jest-DOM for additional matchers
import "@testing-library/jest-dom";
import SuccessMessage from "../Components/Popups/ReservationSuccess";

describe('SuccessMessage Component', () => {
  it('calls handleBackHome function when "Back to Home" button is clicked', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mock implementation to suppress the alert in tests

    render(<SuccessMessage />);
    const backButton = screen.getByText("Back to Home");
    fireEvent.click(backButton);

    expect(alertSpy).toHaveBeenCalled();  // Verify that alert was called
    alertSpy.mockRestore();  // Restore the original function
  });

  // Test to ensure the button's onClick event is handled
  test('calls handleBackHome function when "Back to Home" button is clicked', () => {

    const alertSpy = jest.spyOn(window, 'alert');
    
    render(<SuccessMessage />);
    const backButton = screen.getByText("Back to Home");
    fireEvent.click(backButton);
    
    expect(alertSpy).toHaveBeenCalled();  // Assuming handleBackHome does something detectable like an alert

    alertSpy.mockRestore();
  });
});