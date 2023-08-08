import { FormEvent, useState } from "react";
import styled from "styled-components";

import Button from "../../ui/button";
import FileInput from "../../ui/file-input";
import Form from "../../ui/form";
import FormRow from "../../ui/form-row";
import Input from "../../ui/input";
import { useUser } from "./use-user";
import { useUpdateUser } from "./use-update-user";

const Avatar = styled.img`
  display: block;
  width: 12rem;
  margin-right: 2rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;

  outline: 2px solid var(--color-grey-100);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

function UpdateUserDataForm() {
  const { user } = useUser();

  const {
    email,
    user_metadata: { full_name: currentFullName, avatar: avatarImage },
  } = user;

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { full_name: fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <Wrapper>
          {avatarImage && (
            <Avatar src={avatarImage} alt={`Avatar of ${currentFullName}`} />
          )}
          <FileInput
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            disabled={isUpdating}
          />
        </Wrapper>
      </FormRow>

      <FormRow>
        <>
          <Button
            type="reset"
            variation="secondary"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
