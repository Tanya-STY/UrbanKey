// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// // import "@testing-library/jest-dom/extend-expect"; // Import Jest-DOM for additional matchers
// import "@testing-library/jest-dom";
// import Finance from "../Components/FinanceDashboard/Finance";

// describe("Finance Component", () => {
//   test("renders the financial management dashboard title", () => {
//     render(<Finance />);
//     expect(
//       screen.getByText("Financial Management Dashboard")
//     ).toBeInTheDocument();
//   });

//   test("updates condo fees correctly", () => {
//     render(<Finance />);
//     const feePerSquareFootInput = screen.getByLabelText(
//       "Fee per Square Foot ($):"
//     );
//     const feePerParkingSpotInput = screen.getByLabelText(
//       "Fee per Parking Spot ($):"
//     );
//     const updateFeesButton = screen.getByText("Update Fees");

//     fireEvent.change(feePerSquareFootInput, { target: { value: 10 } });
//     fireEvent.change(feePerParkingSpotInput, { target: { value: 20 } });

//     fireEvent.click(updateFeesButton);

//     expect(window.alert).toHaveBeenCalledWith(
//       "Fees updated: Fee per Square Foot: $10, Fee per Parking Spot: $20"
//     );
//   });

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Finance from "../Components/FinanceDashboard/Finance";

describe("Finance Component Tests", () => {
  test("renders without crashing", () => {
    render(<Finance />);
    expect(document.querySelector(".finance-container")).toBeInTheDocument();
  });

  test("updates fees correctly", () => {
    const { getByPlaceholderText, getByText } = render(<Finance />);
  
    const squareFootInput = getByPlaceholderText("Enter Fee per Square Foot");
    const parkingSpotInput = getByPlaceholderText("Enter Fee per Parking Spot");
  
    fireEvent.change(squareFootInput, { target: { value: "10" } });
    fireEvent.change(parkingSpotInput, { target: { value: "20" } });
  
    fireEvent.click(getByText("Update Fees"));
  
    expect(window.alert).toHaveBeenCalledWith(
      "Fees updated: Fee per Square Foot: $10, Fee per Parking Spot: $20"
    );
  });
  
  
  test("adds cost correctly", () => {
    const { getByPlaceholderText, getByText } = render(<Finance />);
  
    const operationNameInput = getByPlaceholderText("Operation Name:");
    const costInput = getByPlaceholderText("Cost ($)");
  
    fireEvent.change(operationNameInput, { target: { value: "Maintenance" } });
    fireEvent.change(costInput, { target: { value: "1000" } });
  
    fireEvent.click(getByText("Add Cost"));
  
    expect(window.alert).toHaveBeenCalledWith(
      "Cost added: Operation Name: Maintenance, Cost: $1000"
    );
  });

  test("generates overview graph correctly", () => {
    const { getByText } = render(<Finance />);
    fireEvent.click(getByText("Generate"));

    expect(getByText("Overview")).toBeInTheDocument();
    expect(getByText("Annual Financial Reports")).toBeInTheDocument();
  });
});


















  // test("adds operational costs correctly", () => {
  //   render(<Finance />);
  //   const operationNameInput = screen.getByLabelText("Operation Name:");
  //   const costInput = screen.getByLabelText("Cost ($):");
  //   const addCostButton = screen.getByText("Add Cost");

  //   fireEvent.change(operationNameInput, { target: { value: "Maintenance" } });
  //   fireEvent.change(costInput, { target: { value: 500 } });

  //   fireEvent.click(addCostButton);

  //   expect(window.alert).toHaveBeenCalledWith(
  //     "Cost added: Operation Name: Maintenance, Cost: $500"
  //   );
  // });

//   test("generates overview graph and displays annual financial reports", () => {
//     render(<Finance />);
//     const generateButton = screen.getByText("Generate");

//     fireEvent.click(generateButton);

//     const reports = [
//       { name: "John Doe", date: "2024-01-15", amountPaid: "1200" },
//       // Add more report objects as needed
//     ];
  
//     // Iterate through each report and check if its details are present
//     reports.forEach((report) => {
//       expect(
//         screen.getByText(
//           `Name: ${report.name} | Date of Purchase: ${report.date} | Amount Paid: $${report.amountPaid}`
//         )
//       ).toBeInTheDocument();
//     // Add more assertions for other items if needed
//   });
// });

// });
