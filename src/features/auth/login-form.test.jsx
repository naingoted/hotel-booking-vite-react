import { screen, logRoles } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/render-with-providers";
import LoginForm from "./login-form";

test("renders LoginForm without crashing", () => {
  const { container } = renderWithProviders(<LoginForm />);
  logRoles(container);
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const passwordInput = screen.getByRole("textbox", { name: /password/i });
  const loginButton = screen.getByRole("button", { name: /log in/i });
  const signUpButton = screen.getByRole("button", { name: /sign up/i });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
});
