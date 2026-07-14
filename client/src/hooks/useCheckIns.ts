import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export type CheckIn = {
  id: string;
  date: string;
  studyHours: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CheckInInput = {
  studyHours: number;
  notes?: string;
};

export function useTodayCheckIn() {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["checkins", "today"],
    queryFn: () => apiFetch<CheckIn | null>("/checkins/today", { token }),
    enabled: !!token,
  });
}

export function useCheckInHistory() {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["checkins", "history"],
    queryFn: () => apiFetch<CheckIn[]>("/checkins", { token }),
    enabled: !!token,
  });
}

function useInvalidateCheckIns() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["checkins", "today"] });
    queryClient.invalidateQueries({ queryKey: ["checkins", "history"] });
  };
}

export function useCreateCheckIn() {
  const { token } = useAuth();
  const invalidate = useInvalidateCheckIns();
  return useMutation({
    mutationFn: (input: CheckInInput) =>
      apiFetch<CheckIn>("/checkins", { method: "POST", body: input, token }),
    onSuccess: invalidate,
  });
}

export function useUpdateCheckIn() {
  const { token } = useAuth();
  const invalidate = useInvalidateCheckIns();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<CheckInInput> }) =>
      apiFetch<CheckIn>(`/checkins/${id}`, { method: "PUT", body: input, token }),
    onSuccess: invalidate,
  });
}
