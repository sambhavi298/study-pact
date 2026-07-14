import { useState } from "react";
import { CalendarCheck, Pencil } from "lucide-react";
import { Heading } from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { Card } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { Dialog } from "../components/ui/Dialog";
import { IconButton } from "../components/ui/IconButton";
import { CheckInForm } from "../components/CheckInForm";
import { useToast } from "../components/ui/Toast";
import {
  useTodayCheckIn,
  useCheckInHistory,
  useCreateCheckIn,
  useUpdateCheckIn,
  type CheckInInput,
} from "../hooks/useCheckIns";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function CheckIns() {
  const { data: today, isLoading: todayLoading } = useTodayCheckIn();
  const { data: history, isLoading: historyLoading } = useCheckInHistory();
  const createCheckIn = useCreateCheckIn();
  const updateCheckIn = useUpdateCheckIn();
  const { showToast } = useToast();
  const [editOpen, setEditOpen] = useState(false);

  function handleCreate(input: CheckInInput) {
    createCheckIn.mutate(input, {
      onSuccess: () => showToast("Checked in for today", "success"),
      onError: () => showToast("Could not save check-in", "error"),
    });
  }

  function handleEdit(input: CheckInInput) {
    if (!today) return;
    updateCheckIn.mutate(
      { id: today.id, input },
      {
        onSuccess: () => {
          setEditOpen(false);
          showToast("Check-in updated", "success");
        },
        onError: () => showToast("Could not update check-in", "error"),
      },
    );
  }

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <Heading level={1} className="mb-4">Tonight's Check-In</Heading>

        {todayLoading && <Skeleton className="h-24" />}

        {!todayLoading && !today && (
          <Card>
            <CheckInForm onSubmit={handleCreate} isSubmitting={createCheckIn.isPending} />
          </Card>
        )}

        {!todayLoading && today && (
          <Card className="flex items-start justify-between">
            <div>
              <Text className="font-medium">{today.studyHours} hours studied</Text>
              {today.notes && (
                <Text variant="secondary" size="small" className="mt-1">
                  {today.notes}
                </Text>
              )}
            </div>
            <IconButton
              icon={Pencil}
              variant="ghost"
              aria-label="Edit today's check-in"
              onClick={() => setEditOpen(true)}
            />
          </Card>
        )}

        <Dialog open={editOpen} onClose={() => setEditOpen(false)} title="Edit Check-In">
          {today && (
            <CheckInForm
              initialValues={today}
              onSubmit={handleEdit}
              onCancel={() => setEditOpen(false)}
              isSubmitting={updateCheckIn.isPending}
            />
          )}
        </Dialog>
      </div>

      <div>
        <Heading level={2} className="mb-4">History</Heading>

        {historyLoading && (
          <div className="space-y-3">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        )}

        {history && history.length === 0 && (
          <Card>
            <EmptyState
              icon={CalendarCheck}
              title="No check-ins yet"
              description="Your check-in history will appear here once you complete your first one."
            />
          </Card>
        )}

        {history && history.length > 0 && (
          <div className="space-y-3">
            {history.map((entry) => (
              <Card key={entry.id}>
                <Text className="font-medium">{formatDate(entry.date)}</Text>
                <Text variant="secondary" size="small" className="mt-1">
                  {entry.studyHours} hours{entry.notes ? ` — ${entry.notes}` : ""}
                </Text>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
