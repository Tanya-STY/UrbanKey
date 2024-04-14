import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegistrationKey from "../Components/RegistrationKey/RegistrationKey";

describe("RegistrationKey Component", () => {
  test("renders welcome message and input field correctly", () => {
    render(<RegistrationKey />);
    expect(screen.getByText("Welcome to URBANKEY.")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter Registration Key")
    ).toBeInTheDocument();
  });

  test("renders registration button and support link correctly", () => {
    render(<RegistrationKey />);
    expect(screen.getByText("Become a Member")).toBeInTheDocument();
    expect(screen.getByText("Need help? Contact Support.")).toBeInTheDocument();
  });

  test("renders house image correctly", () => {
    render(<RegistrationKey />);
    
    const houseImage = screen.getByAltText("House Image");
    expect(houseImage).toBeInTheDocument();
    expect(houseImage.tagName).toBe("IMG");
  });
});
