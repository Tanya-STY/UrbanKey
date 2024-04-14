import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Employee from "../Components/Employees/Employee";

test("renders export button", () => {
  render(<Employee />);
  const exportButton = screen.getByText(/Export/i);
  expect(exportButton).toBeInTheDocument();
});

test("renders new employees button", () => {
  render(<Employee />);
  const newEmployeesButton = screen.getByText(/New Employees/i);
  expect(newEmployeesButton).toBeInTheDocument();
});


test("renders search input field", () => {
  render(<Employee />);
  const searchInput = screen.getByPlaceholderText(/Search Employee by name, role, ID or any related keywords/i);
  expect(searchInput).toBeInTheDocument();
});

test("renders DataGrid component", () => {
  render(<Employee />);
  const dataGrid = screen.getByRole("grid");
  expect(dataGrid).toBeInTheDocument();
});

test("renders correct number of rows in DataGrid", () => {
  render(<Employee />);
  // Adjust the expected row count based on the actual data
  // Here, assuming 10 includes header row + 9 data rows
  const dataGrid = screen.getByRole("grid");
  expect(dataGrid).toHaveAttribute("aria-rowcount", "10");
});


