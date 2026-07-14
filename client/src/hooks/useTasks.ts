import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  dueDate: string | null;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
};

export type TaskInput = {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: Priority;
};

export function useTasks() {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => apiFetch<Task[]>("/tasks", { token }),
    enabled: !!token,
  });
}

export function useCreateTask() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: TaskInput) =>
      apiFetch<Task>("/tasks", { method: "POST", body: input, token }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useUpdateTask() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<TaskInput> & { completed?: boolean } }) =>
      apiFetch<Task>(`/tasks/${id}`, { method: "PUT", body: input, token }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useDeleteTask() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiFetch<void>(`/tasks/${id}`, { method: "DELETE", token }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
