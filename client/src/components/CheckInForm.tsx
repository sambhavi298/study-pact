import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "./ui/FormField";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import type { CheckIn, CheckInInput } from "../hooks/useCheckIns";

const checkInFormSchema = z.object({
  studyHours: z.coerce.number().min(0, "Study hours cannot be negative"),
  notes: z.string().optional(),
});

type CheckInFormProps = {
  initialValues?: CheckIn;
  onSubmit: (input: CheckInInput) => void;
  onCancel?: () => void;
  isSubmitting: boolean;
};

export function CheckInForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
}: CheckInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof checkInFormSchema>, unknown, z.output<typeof checkInFormSchema>>({
    resolver: zodResolver(checkInFormSchema),
    defaultValues: {
      studyHours: initialValues?.studyHours ?? 0,
      notes: initialValues?.notes ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Hours studied" required error={errors.studyHours?.message}>
        <Input type="number" step="0.5" min="0" {...register("studyHours")} />
      </FormField>

      <FormField label="Notes">
        <Textarea placeholder="What did you work on today?" {...register("notes")} />
      </FormField>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={isSubmitting}>
          {initialValues ? "Save Changes" : "Check In"}
        </Button>
      </div>
    </form>
  );
}
