import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "./ui/FormField";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useToast } from "./ui/Toast";
import { useSendFriendRequest } from "../hooks/useFriends";
import { ApiError } from "../lib/api";

const addFriendSchema = z.object({
  email: z.string().email(),
});
type AddFriendValues = z.infer<typeof addFriendSchema>;

export function AddFriendForm() {
  const { showToast } = useToast();
  const sendRequest = useSendFriendRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddFriendValues>({ resolver: zodResolver(addFriendSchema) });

  function onSubmit({ email }: AddFriendValues) {
    sendRequest.mutate(email, {
      onSuccess: () => {
        showToast("Friend request sent", "success");
        reset();
      },
      onError: (error) => {
        const message = error instanceof ApiError ? error.message : "Could not send request";
        showToast(message, "error");
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-2">
      <div className="flex-1">
        <FormField label="Add a friend by email" error={errors.email?.message}>
          <Input placeholder="friend@example.com" {...register("email")} />
        </FormField>
      </div>
      <Button type="submit" isLoading={sendRequest.isPending} className="mt-6">
        Send Request
      </Button>
    </form>
  );
}
