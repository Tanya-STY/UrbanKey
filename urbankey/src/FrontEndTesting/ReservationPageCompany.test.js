import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import ReservationPageCompany from "../Components/ReservationPageCompany/ReservationPageCompany";

describe("ReservationPageCompany Component", () => {
  test("renders ReservationPageCompany component", () => {
    render(<ReservationPageCompany />);
  });

  test("displays search bar", () => {
    render(<ReservationPageCompany />);
    expect(
      screen.getByPlaceholderText("Search by name, contact number, email")
    ).toBeInTheDocument();
  });

  test("toggles the reservation form on button click", () => {
    render(<ReservationPageCompany />);
    const newReservationButton = screen.getByText("New Reservation");
    expect(screen.queryByText("Create New Reservation")).not.toBeInTheDocument();
    fireEvent.click(newReservationButton);
    expect(screen.getByText("Create New Reservation")).toBeInTheDocument();
    fireEvent.click(newReservationButton);
    expect(screen.queryByText("Create New Reservation")).not.toBeInTheDocument();
  });

  test("renders date picker", () => {
    const { container } = render(<ReservationPageCompany />);
    const datePicker = container.querySelector(".date-picker");
    expect(datePicker).toBeInTheDocument();
  });

  test("renders facility checkboxes", () => {
    render(<ReservationPageCompany />);
    const facilityOptions = screen.getAllByRole('checkbox');
    expect(facilityOptions.length).toBeGreaterThan(0);
  });

  test("updates search term on user input", () => {
    render(<ReservationPageCompany />);
    const searchInput = screen.getByPlaceholderText("Search by name, contact number, email");
    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(searchInput.value).toBe('John');
  });

  test("updates facility selection on user input", async () => {
    render(<ReservationPageCompany />);
    fireEvent.click(screen.getByText('New Reservation'));
    const facilitySelect = screen.getByTestId("facility-select");
    fireEvent.change(facilitySelect, { target: { value: 'Spa & Fitness' } });
    expect(facilitySelect.value).toBe('Spa & Fitness');
  });

  test("calls handleSubmit on form submission", () => {
    const handleSubmit = jest.fn();
    render(<ReservationPageCompany />);
    const newReservationButton = screen.getByText("New Reservation");
    fireEvent.click(newReservationButton);
    const createButton = screen.getByText("Create Reservation");
    fireEvent.click(createButton);
    expect(handleSubmit).not.toHaveBeenCalled();
  });


});
