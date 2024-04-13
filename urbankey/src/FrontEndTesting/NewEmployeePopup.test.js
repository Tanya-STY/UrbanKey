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


    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Role"), {
      target: { value: "Manager" },
    });
    fireEvent.change(screen.getByLabelText("Company Name"), {
      target: { value: "ABC Inc." },
    });


    fireEvent.click(screen.getByText("Add Employee"));

   
    expect(mockOnAdd).toHaveBeenCalledWith({
      name: "John Doe",
      id: expect.any(String),
      role: "Manager",
      status: "Inactive",
      companyName: "ABC Inc.",
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  test("initializes form fields with correct initial values", () => {
    render(<NewEmployeePopup open={true} onClose={() => {}} onAdd={() => {}} />);
    expect(screen.getByLabelText("Name").value).toBe('');
    expect(screen.getByLabelText("Role").value).toBe('');
    expect(screen.getByLabelText("Company Name").value).toBe('');
  });

  test("resets form fields after form submission", () => {
    const mockOnAdd = jest.fn();
    const mockOnClose = jest.fn();
  
    render(<NewEmployeePopup open={true} onClose={mockOnClose} onAdd={mockOnAdd} />);
  
 
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByLabelText("Role"), { target: { value: "Developer" } });
    fireEvent.change(screen.getByLabelText("Company Name"), { target: { value: "XYZ Corp." } });
  
   
    fireEvent.click(screen.getByText("Add Employee"));
  
   
    expect(screen.getByLabelText("Name").value).toBe('');
    expect(screen.getByLabelText("Role").value).toBe('');
    expect(screen.getByLabelText("Company Name").value).toBe('');
  });

  test("closes the dialog after form submission", () => {
    const mockOnClose = jest.fn();
    render(<NewEmployeePopup open={true} onClose={mockOnClose} onAdd={() => {}} />);
  
    fireEvent.click(screen.getByText("Add Employee"));
  
    expect(mockOnClose).toHaveBeenCalled();
  });

  
  test("updates state on form field changes", () => {
    render(<NewEmployeePopup open={true} onClose={() => {}} onAdd={() => {}} />);
  
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Smith" } });
    expect(screen.getByLabelText("Name").value).toBe("John Smith");
  
    fireEvent.change(screen.getByLabelText("Role"), { target: { value: "Lead" } });
    expect(screen.getByLabelText("Role").value).toBe("Lead");
  
    fireEvent.change(screen.getByLabelText("Company Name"), { target: { value: "Tech Solutions" } });
    expect(screen.getByLabelText("Company Name").value).toBe("Tech Solutions");
  });

});
