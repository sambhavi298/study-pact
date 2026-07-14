import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export type FriendUser = {
  id: string;
  name: string;
  email: string;
};

export type IncomingRequest = {
  id: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  sender: FriendUser;
};

export function useIncomingRequests() {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["friendRequests", "incoming"],
    queryFn: () => apiFetch<IncomingRequest[]>("/friend-requests", { token }),
    enabled: !!token,
  });
}

export function useFriendsList() {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["friends"],
    queryFn: () => apiFetch<FriendUser[]>("/friends", { token }),
    enabled: !!token,
  });
}

export function useSendFriendRequest() {
  const { token } = useAuth();
  return useMutation({
    mutationFn: (email: string) =>
      apiFetch("/friend-requests", { method: "POST", body: { email }, token }),
  });
}

export function useAcceptRequest() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/friend-requests/${id}/accept`, { method: "PUT", token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests", "incoming"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
}

export function useRejectRequest() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/friend-requests/${id}/reject`, { method: "PUT", token }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["friendRequests", "incoming"] }),
  });
}
