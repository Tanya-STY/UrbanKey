import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// import '@testing-library/jest-dom/extend-expect'; // Import Jest-DOM for additional matchers
import "@testing-library/jest-dom";
import PropertyProfileManagement from "../Components/PropertyProfileManagement/PropertyProfileManagement";

describe("PropertyProfileManagement Component", () => {
  test("renders the main title correctly", () => {
    render(<PropertyProfileManagement />);
    expect(screen.getByText("Property Profile Management")).toBeInTheDocument();
  });

  test("displays input fields for property details", () => {
    render(<PropertyProfileManagement />);
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Unit Owner")).toBeInTheDocument();
    // Add more assertions for other input fields
  });

  test("allows selecting a file for upload", () => {
    const { container } = render(<PropertyProfileManagement />);
    const fileInput = container.querySelector('input[type="file"]');
    fireEvent.change(fileInput, {
      target: {
        files: [new File(["photo1"], "photo1.png", { type: "image/png" })],
      },
    });
    expect(fileInput.files[0].name).toBe("photo1.png");
  });

  test("displays map iframe for location", () => {
    render(<PropertyProfileManagement />);
    const mapIframe = screen.getByTitle("Google Maps");
    expect(mapIframe).toBeInTheDocument();
  });

  test("displays photo upload section correctly", () => {
    render(<PropertyProfileManagement />);
    expect(screen.getByText("Posting Photos")).toBeInTheDocument();
    expect(screen.getByText("You can add upto 30 photos")).toBeInTheDocument();
    expect(screen.getByText("Browse From Computer")).toBeInTheDocument();
    expect(
      screen.getByText("You can add 30 photos to your ad")
    ).toBeInTheDocument();
  });

  // You can add more tests to cover other functionalities of the component
});
