import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSettings as updateSettingsApi } from "../../services/api-settings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdating, updateSettings };
}
