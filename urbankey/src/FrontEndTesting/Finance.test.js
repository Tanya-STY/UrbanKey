import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect"; // Import Jest-DOM for additional matchers
import "@testing-library/jest-dom";
import Finance from "../Components/FinanceDashboard/Finance";

describe("Finance Component", () => {
  test("renders the financial management dashboard title", () => {
    render(<Finance />);
    expect(
      screen.getByText("Financial Management Dashboard")
    ).toBeInTheDocument();
  });

  test("updates condo fees correctly", () => {
    render(<Finance />);
    const feePerSquareFootInput = screen.getByLabelText(
      "Fee per Square Foot ($):"
    );
    const feePerParkingSpotInput = screen.getByLabelText(
      "Fee per Parking Spot ($):"
    );
    const updateFeesButton = screen.getByText("Update Fees");

    fireEvent.change(feePerSquareFootInput, { target: { value: 10 } });
    fireEvent.change(feePerParkingSpotInput, { target: { value: 20 } });

    fireEvent.click(updateFeesButton);

    expect(window.alert).toHaveBeenCalledWith(
      "Fees updated: Fee per Square Foot: $10, Fee per Parking Spot: $20"
    );
  });

  test("adds operational costs correctly", () => {
    render(<Finance />);
    const operationNameInput = screen.getByLabelText("Operation Name:");
    const costInput = screen.getByLabelText("Cost ($):");
    const addCostButton = screen.getByText("Add Cost");

    fireEvent.change(operationNameInput, { target: { value: "Maintenance" } });
    fireEvent.change(costInput, { target: { value: 500 } });

    fireEvent.click(addCostButton);

    expect(window.alert).toHaveBeenCalledWith(
      "Cost added: Operation Name: Maintenance, Cost: $500"
    );
  });

  test("generates overview graph and displays annual financial reports", () => {
    render(<Finance />);
    const generateButton = screen.getByText("Generate");

    fireEvent.click(generateButton);

    expect(screen.getByText("Annual Financial Reports")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Name: John Doe | Date of Purchase: 2024-01-15 | Amount Paid: $1200"
      )
    ).toBeInTheDocument();
    
  });
});
