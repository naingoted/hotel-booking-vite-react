import { useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../../ui/input";
import Form from "../../ui/form";
import Button from "../../ui/button";
import FileInput from "../../ui/file-input";
import Textarea from "../../ui/text-area";
import FormRow from "../../ui/form-row";

import { useCreateCabin } from "./use-create-cabin";
import { useEditCabin } from "./use-edit-cabin";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ImagePreview = styled.img`
  display: block;
  width: 12rem;
  margin-right: 2rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;

  outline: 2px solid var(--color-grey-100);
`;

interface CreateCabinFormProps {
  cabinToEdit?: {
    id: string;
    name: string;
    max_capacity: number;
    regular_price: number;
    discount: number;
    description: string;
    image: string;
  };
  onCloseModal?: () => void;
}

function CreateCabinForm({
  cabinToEdit = {
    id: "",
    name: "",
    max_capacity: 0,
    regular_price: 0,
    discount: 0,
    description: "",
    image: "",
  },
  onCloseModal,
}: CreateCabinFormProps) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: +editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors: unknown) {
    console.log("onError", errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isWorking}
          {...register("max_capacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isWorking}
          {...register("regular_price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regular_price ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <Wrapper>
          {isEditSession && editValues?.image && (
            <ImagePreview src={editValues.image} />
          )}
          <FileInput
            id="image"
            accept="image/*"
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
          />
        </Wrapper>
      </FormRow>

      <FormRow>
        <>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? "Edit cabin" : "Create new cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
