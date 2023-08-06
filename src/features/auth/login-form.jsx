import { useState } from "react";
import Buttom from "../../ui/button";
import FormRow from "../../ui/form-row";
import Form from "../../form";
import Input from "../../ui/input";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit() {}

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large">Login</Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
