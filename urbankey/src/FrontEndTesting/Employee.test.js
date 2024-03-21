import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Employee from "../Components/Employees/Employee";

describe("Employee component", () => {
  test("renders header with correct text", () => {
    render(<Employee />);
    const headerElement = screen.getByText(/Employees/i);
    expect(headerElement).toBeInTheDocument();
  });

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
    const searchInput = screen.getByPlaceholderText(
      /Search Employee by name, role, ID or any related keywords/i
    );
    expect(searchInput).toBeInTheDocument();
  });

  test("renders DataGrid component", () => {
    render(<Employee />);
    const dataGrid = screen.getByRole("grid");
    expect(dataGrid).toBeInTheDocument();
  });

  test("renders correct number of rows in DataGrid", () => {
    render(<Employee />);
    const rows = screen.getAllByRole("row");
    // Subtracting 1 because the first row is the header row
    expect(rows.length - 1).toBe(9); // 9 rows in the provided data
  });

  test("renders correct number of columns in DataGrid", () => {
    render(<Employee />);
    const headerCells = screen.getAllByRole("columnheader");
    expect(headerCells.length).toBe(5); // 5 columns in the provided data
  });
});
