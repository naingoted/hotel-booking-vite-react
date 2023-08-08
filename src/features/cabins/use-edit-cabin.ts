import { NewCabin } from "./../../services/api-cabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/api-cabins";
import { toast } from "react-hot-toast";

interface EditCabinProps {
  newCabinData: NewCabin;
  id: number;
}

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: EditCabinProps) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err: unknown) => {
      const errorMessage =
        (err as Error)?.message ?? "An unknown error occurred";
      toast.error(errorMessage);
    },
  });

  return { isEditing, editCabin };
}
