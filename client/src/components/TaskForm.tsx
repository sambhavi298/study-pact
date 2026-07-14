import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "./ui/FormField";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import type { Task, TaskInput } from "../hooks/useTasks";

const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

type TaskFormProps = {
  initialValues?: Task;
  onSubmit: (input: TaskInput) => void;
  onCancel: () => void;
  isSubmitting: boolean;
};

export function TaskForm({ initialValues, onSubmit, onCancel, isSubmitting }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      priority: initialValues?.priority ?? "MEDIUM",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Title" required error={errors.title?.message}>
        <Input placeholder="e.g. Finish reading chapter 4" {...register("title")} />
      </FormField>

      <FormField label="Description">
        <Textarea placeholder="Optional details..." {...register("description")} />
      </FormField>

      <FormField label="Priority">
        <Select {...register("priority")}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </Select>
      </FormField>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {initialValues ? "Save Changes" : "Add Task"}
        </Button>
      </div>
    </form>
  );
}
