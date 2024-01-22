import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils/render-with-providers";
import LoginForm from "./login-form";

test("renders LoginForm without crashing", () => {
  renderWithProviders(<LoginForm />);
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole("button", { name: /log in/i });
  const signUpButton = screen.getByRole("button", { name: /sign up/i });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
});

// @todo
/**
 * 1. Test the form validation
 * 2. test the form submission
 * 3. test the form submission with invalid data
 * 4. test the form submission with valid data
 */

test("test the form submission wih correct credential", () => {
  const user = userEvent.setup();
  renderWithProviders(<LoginForm />);
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole("button", { name: /log in/i });

  user.type(emailInput, "email@email.com");
  user.type(passwordInput, "pass");
  user.click(loginButton); // click login button
  // expect(loginButton).toBeDisabled();
  // console.log network request
});
