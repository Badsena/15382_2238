import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "../Components/Register";
import { BrowserRouter as Router } from "react-router-dom";

// Mock window.alert
beforeAll(() => {
  window.alert = jest.fn();
});

describe("Register Component - UI and empty field validation", () => {
  beforeEach(() => {
    window.alert.mockClear();
    render(
      <Router>
        <Register />
      </Router>
    );
  });

  test("renders all input fields and dropdown", () => {
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument(); // for <select>
  });

  test("renders Register button and Login link", () => {
    // Use getAllByText to avoid "multiple elements" error
    const registerButtons = screen.getAllByText(/register/i);
    const loginLink = screen.getByRole("link", { name: /login/i });

    expect(registerButtons.length).toBeGreaterThan(0);
    expect(loginLink).toBeInTheDocument();
  });

  test("shows alert when fields are empty", () => {
    const buttons = screen.getAllByText(/register/i);
    const registerButton = buttons.find(btn => btn.tagName === "BUTTON");
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields");
  });
});
