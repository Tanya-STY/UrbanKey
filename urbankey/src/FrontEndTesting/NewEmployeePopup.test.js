import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NewEmployeePopup from "../Components/EmployeePage/NewEmployeePopup";
import "@testing-library/jest-dom/extend-expect";

describe("NewEmployeePopup component", () => {
  test("renders with correct title", () => {
    render(
      <NewEmployeePopup open={true} onClose={() => {}} onAdd={() => {}} />
    );
    expect(screen.getByText("Add New Employee")).toBeInTheDocument();
  });

  test("renders text fields correctly", () => {
    render(
      <NewEmployeePopup open={true} onClose={() => {}} onAdd={() => {}} />
    );
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Role")).toBeInTheDocument();
    expect(screen.getByLabelText("Company Name")).toBeInTheDocument();
  });

  test("handles form submission correctly", () => {
    const mockOnAdd = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <NewEmployeePopup open={true} onClose={mockOnClose} onAdd={mockOnAdd} />
    );

    // Fill in form fields
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Role"), {
      target: { value: "Manager" },
    });
    fireEvent.change(screen.getByLabelText("Company Name"), {
      target: { value: "ABC Inc." },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Add Employee"));

    // Check if onAdd function is called with correct data
    expect(mockOnAdd).toHaveBeenCalledWith({
      name: "John Doe",
      id: expect.any(String),
      role: "Manager",
      status: "Inactive",
      companyName: "ABC Inc.",
    });

    // Check if onClose function is called
    expect(mockOnClose).toHaveBeenCalled();
  });
});
