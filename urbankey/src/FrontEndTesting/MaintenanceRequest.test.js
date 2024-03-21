import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MaintenanceRequest from "../Components/Popups/MaintenanceRequest";

describe("MaintenanceRequest Component", () => {
  test("renders the maintenance requests title", () => {
    render(<MaintenanceRequest />);
    expect(screen.getByText("Maintenance Requests")).toBeInTheDocument();
  });

  test("allows user to input title and description", () => {
    render(<MaintenanceRequest />);
    const titleInput = screen.getByLabelText("Title");
    const descriptionTextarea = screen.getByLabelText("Request Description");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(descriptionTextarea, {
      target: { value: "Test Description" },
    });

    expect(titleInput).toHaveValue("Test Title");
    expect(descriptionTextarea).toHaveValue("Test Description");
  });

  test("submits the form with correct data", () => {
    render(<MaintenanceRequest />);
    const titleInput = screen.getByLabelText("Title");
    const descriptionTextarea = screen.getByLabelText("Request Description");
    const submitButton = screen.getByText("Submit Your Request");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(descriptionTextarea, {
      target: { value: "Test Description" },
    });
    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith("Submitted:", {
      title: "Test Title",
      description: "Test Description",
    });
  });
});


//comment