import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DailyOperations from "../Components/DailyOperations/DailyOperations";
import "@testing-library/jest-dom/extend-expect";

describe("DailyOperations component", () => {
  beforeEach(() => {
    render(<DailyOperations />);
  });

  test("renders without crashing", () => {
    expect(screen.getByText("Daily Operations")).toBeInTheDocument();
  });

  test("renders search input field", () => {
    expect(
      screen.getByPlaceholderText("Search by name, contact number, email")
    ).toBeInTheDocument();
  });

  test("renders table headers correctly", () => {
    expect(screen.getByText("Condo Owner")).toBeInTheDocument();
    expect(screen.getByText("Request Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Contact Number")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  test("renders operations in the table body", () => {
    expect(screen.getAllByRole("row")).toHaveLength(11); // Including table header
  });

  test("renders status dropdown for each operation", () => {
    const statusDropdowns = screen.getAllByRole("combobox");
    expect(statusDropdowns).toHaveLength(10); // One for each operation
  });

  test("handles status change correctly", () => {
    const firstOperationStatusDropdown = screen.getAllByRole("combobox")[0];
    fireEvent.change(firstOperationStatusDropdown, {
      target: { value: "done" },
    });
    expect(firstOperationStatusDropdown).toHaveValue("done");
  });

  test("filters operations based on search term", () => {
    const searchInput = screen.getByPlaceholderText(
      "Search by name, contact number, email"
    );
    fireEvent.change(searchInput, { target: { value: "Condo Owner 1" } });
    const filteredOperations = screen.getAllByRole("row");
    expect(filteredOperations).toHaveLength(3); // Including table header
  });
});
