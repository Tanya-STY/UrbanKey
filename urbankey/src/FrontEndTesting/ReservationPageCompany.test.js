import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import ReservationPageCompany from "../Components/ReservationPageCompany/ReservationPageCompany";

describe("ReservationPageCompany Component", () => {
  test("renders ReservationPageCompany component", () => {
    render(<ReservationPageCompany />);
  });

  test("displays search bar", () => {
    render(<ReservationPageCompany />);
    expect(
      screen.getByPlaceholderText("Search by name, contact number, email")
    ).toBeInTheDocument();
  });

});
