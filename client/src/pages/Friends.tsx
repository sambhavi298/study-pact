import { Users, UserCheck, UserX } from "lucide-react";
import { Heading } from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { Card } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { IconButton } from "../components/ui/IconButton";
import { AddFriendForm } from "../components/AddFriendForm";
import { useToast } from "../components/ui/Toast";
import {
  useIncomingRequests,
  useFriendsList,
  useAcceptRequest,
  useRejectRequest,
} from "../hooks/useFriends";

export function Friends() {
  const { data: requests, isLoading: requestsLoading } = useIncomingRequests();
  const { data: friends, isLoading: friendsLoading } = useFriendsList();
  const acceptRequest = useAcceptRequest();
  const rejectRequest = useRejectRequest();
  const { showToast } = useToast();

  function handleAccept(id: string) {
    acceptRequest.mutate(id, {
      onSuccess: () => showToast("Friend request accepted", "success"),
      onError: () => showToast("Could not accept request", "error"),
    });
  }

  function handleReject(id: string) {
    rejectRequest.mutate(id, {
      onSuccess: () => showToast("Friend request declined", "success"),
      onError: () => showToast("Could not decline request", "error"),
    });
  }

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <Heading level={1} className="mb-4">Friends</Heading>
        <Card>
          <AddFriendForm />
        </Card>
      </div>

      <div>
        <Heading level={2} className="mb-4">Incoming Requests</Heading>

        {requestsLoading && <Skeleton className="h-16" />}

        {requests && requests.length === 0 && (
          <Text variant="secondary" size="small">No pending requests.</Text>
        )}

        {requests && requests.length > 0 && (
          <div className="space-y-3">
            {requests.map((req) => (
              <Card key={req.id} className="flex items-center justify-between">
                <div>
                  <Text className="font-medium">{req.sender.name}</Text>
                  <Text variant="secondary" size="small">{req.sender.email}</Text>
                </div>
                <div className="flex gap-1">
                  <IconButton
                    icon={UserCheck}
                    variant="secondary"
                    aria-label={`Accept friend request from ${req.sender.name}`}
                    onClick={() => handleAccept(req.id)}
                  />
                  <IconButton
                    icon={UserX}
                    variant="ghost"
                    aria-label={`Decline friend request from ${req.sender.name}`}
                    onClick={() => handleReject(req.id)}
                  />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <Heading level={2} className="mb-4">Your Friends</Heading>

        {friendsLoading && <Skeleton className="h-16" />}

        {friends && friends.length === 0 && (
          <Card>
            <EmptyState
              icon={Users}
              title="No friends yet"
              description="Add a friend by email to start building your accountability circle."
            />
          </Card>
        )}

        {friends && friends.length > 0 && (
          <div className="space-y-3">
            {friends.map((friend) => (
              <Card key={friend.id}>
                <Text className="font-medium">{friend.name}</Text>
                <Text variant="secondary" size="small">{friend.email}</Text>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
