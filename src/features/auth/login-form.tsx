import { FormEvent, useState } from "react";
import Button from "../../ui/button";
import Form from "../../ui/form";
import Input from "../../ui/input";
import FormRowVertical from "../../ui/form-row-vertical";
import FormRow from "../../ui/form-row";
import { useLogin } from "./use-login";
import SpinnerMini from "../../ui/spinner-mini";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRow>
        <>
          <Button size="large" disabled={isLoading}>
            {!isLoading ? "Log in" : <SpinnerMini />}
          </Button>
          <Button
            size="large"
            onClick={() => {
              navigate(`/signup`);
            }}
          >
            Sign up
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
