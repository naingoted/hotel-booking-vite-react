import { useForm } from "react-hook-form";
import { useSignup } from "./use-signup";
import Form from "../../ui/form";
import Input from "../../ui/input";
import Button from "../../ui/button";
import { SignUpData } from "../../services/api-auth";
import FormRowVertical from "../../ui/form-row-vertical";
import { useNavigate } from "react-router-dom";
import FormRow from "../../ui/form-row";

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const navigate = useNavigate();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ full_name, email, password }: SignUpData) {
    signup(
      { full_name, email, password },
      {
        onSettled: () => {
          reset();
          navigate("/");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical
        label={"Full name"}
        error={errors?.full_name?.message as unknown as string}
      >
        <Input
          type="text"
          id="full_name"
          disabled={isLoading}
          {...register("full_name", { required: "This field is required" })}
        />
      </FormRowVertical>
      <FormRowVertical
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
      </FormRowVertical>
      <FormRowVertical
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
      </FormRowVertical>
      <FormRowVertical
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
      </FormRowVertical>
      <FormRow>
        <>
          <Button type="reset" disabled={isLoading} onClick={reset}>
            Reset
          </Button>
          <Button disabled={isLoading}>Create new user</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
