import { useForm } from "react-hook-form";
import { useSignup } from "./use-signup";
import Form from "../../ui/form";
import FormRow from "../../ui/form-row";
import Input from "../../ui/input";
import Button from "../../ui/button";
import { SignUpData } from "../../services/api-auth";

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ full_name, email, password }: SignUpData) {
    signup(
      { full_name, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label={"Full name"}
        error={errors?.full_name?.message as unknown as string}
      >
        <Input
          type="text"
          id="full_name"
          disabled={isLoading}
          {...register("full_name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow
        label="Email address"
        error={errors?.email?.message as unknown as string}
      >
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message as unknown as string}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Repeat password"
        error={errors?.passwordConfirm?.message as unknown as string}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            variation="secondary"
            type="reset"
            disabled={isLoading}
            onClick={reset}
          >
            Cancel
          </Button>
          <Button disabled={isLoading}>Create new user</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
