import { Pencil, Trash2 } from "lucide-react";
import { Card } from "./ui/Card";
import { Checkbox } from "./ui/Checkbox";
import { Badge } from "./ui/Badge";
import { Text } from "./ui/Text";
import { IconButton } from "./ui/IconButton";
import type { Task } from "../hooks/useTasks";

const priorityVariant = {
  LOW: "neutral",
  MEDIUM: "warning",
  HIGH: "error",
} as const;

type TaskCardProps = {
  task: Task;
  onToggleComplete: (completed: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card className="flex items-start gap-3 p-4">
      <Checkbox
        id={`task-${task.id}`}
        label=""
        checked={task.completed}
        onChange={(e) => onToggleComplete(e.target.checked)}
        aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Text
            className={task.completed ? "line-through text-secondary" : ""}
          >
            {task.title}
          </Text>
          <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
        </div>
        {task.description && (
          <Text variant="secondary" size="small" className="mt-1">
            {task.description}
          </Text>
        )}
      </div>

      <div className="flex gap-1 shrink-0">
        <IconButton icon={Pencil} variant="ghost" aria-label={`Edit "${task.title}"`} onClick={onEdit} />
        <IconButton icon={Trash2} variant="ghost" aria-label={`Delete "${task.title}"`} onClick={onDelete} />
      </div>
    </Card>
  );
}
