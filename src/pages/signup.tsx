import styled from "styled-components";
import Logo from "../ui/logo";
import Heading from "../ui/heading";
import SignupForm from "../features/auth/signup-form";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Signup() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Sign up for a new account</Heading>
      <SignupForm />
    </LoginLayout>
  );
}

export default Signup;
