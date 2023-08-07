import UpdatePasswordForm from "../features/auth/update-password-form";
import UpdateUserDataForm from "../features/auth/update-user-data-form";
import Heading from "../ui/heading";
import Row from "../ui/row";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
