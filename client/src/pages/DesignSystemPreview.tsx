import { useState } from "react";
import { ListTodo } from "lucide-react";
import { Button } from "../components/ui/Button";
import { IconButton } from "../components/ui/IconButton";
import { Trash2 } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { Heading } from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Select } from "../components/ui/Select";
import { Checkbox } from "../components/ui/Checkbox";
import { FormField } from "../components/ui/FormField";
import { Dialog } from "../components/ui/Dialog";
import { Skeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { useToast } from "../components/ui/Toast";

export function DesignSystemPreview() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { showToast } = useToast();

  return (
    <div className="max-w-3xl space-y-10">
      <Heading level={1}>Design System Preview</Heading>

      <section className="space-y-3">
        <Heading level={2}>Buttons</Heading>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" isLoading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <IconButton icon={Trash2} variant="ghost" aria-label="Delete" />
        </div>
      </section>

      <section className="space-y-3">
        <Heading level={2}>Badges</Heading>
        <div className="flex flex-wrap gap-2">
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="action">Action</Badge>
        </div>
      </section>

      <section className="space-y-3">
        <Heading level={2}>Form Controls</Heading>
        <Card className="space-y-4 max-w-md">
          <FormField label="Task title" required>
            <Input placeholder="e.g. Finish reading chapter 4" />
          </FormField>
          <FormField label="Description">
            <Textarea placeholder="Optional details..." />
          </FormField>
          <FormField label="Priority">
            <Select defaultValue="MEDIUM">
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </Select>
          </FormField>
          <FormField label="Email" error="Please enter a valid email">
            <Input defaultValue="not-an-email" />
          </FormField>
          <Checkbox id="preview-checkbox" label="Mark as complete" />
        </Card>
      </section>

      <section className="space-y-3">
        <Heading level={2}>Card + Text</Heading>
        <Card className="max-w-md">
          <Heading level={3}>Card Title</Heading>
          <Text variant="secondary" size="small" className="mt-1">
            Card titles use IBM Plex Sans, not Fraunces.
          </Text>
          <Text className="mt-3">
            Regular body text renders here, using our standard body variant.
          </Text>
        </Card>
      </section>

      <section className="space-y-3">
        <Heading level={2}>Dialog + Toast</Heading>
        <div className="flex gap-3">
          <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          <Button variant="secondary" onClick={() => showToast("Task saved", "success")}>
            Show Success Toast
          </Button>
          <Button variant="secondary" onClick={() => showToast("Could not save task", "error")}>
            Show Error Toast
          </Button>
        </div>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Delete task?">
          <Text className="mb-4">This action cannot be undone.</Text>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setDialogOpen(false)}>Delete</Button>
          </div>
        </Dialog>
      </section>

      <section className="space-y-3">
        <Heading level={2}>Skeleton</Heading>
        <div className="space-y-2 max-w-md">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </section>

      <section className="space-y-3">
        <Heading level={2}>Empty State</Heading>
        <Card>
          <EmptyState
            icon={ListTodo}
            title="No tasks planned for today"
            description="Add a task when you are ready to define today's work."
            action={<Button variant="secondary">Add Task</Button>}
          />
        </Card>
      </section>
    </div>
  );
}
