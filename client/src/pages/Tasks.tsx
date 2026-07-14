import { useState } from "react";
import { ListTodo, Plus } from "lucide-react";
import { Heading } from "../components/ui/Heading";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { Dialog } from "../components/ui/Dialog";
import { Text } from "../components/ui/Text";
import { TaskCard } from "../components/TaskCard";
import { TaskForm } from "../components/TaskForm";
import { useToast } from "../components/ui/Toast";
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  type Task,
  type TaskInput,
} from "../hooks/useTasks";

export function Tasks() {
  const { data: tasks, isLoading, isError } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const { showToast } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  function openCreateForm() {
    setEditingTask(null);
    setFormOpen(true);
  }

  function openEditForm(task: Task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  function handleFormSubmit(input: TaskInput) {
    if (editingTask) {
      updateTask.mutate(
        { id: editingTask.id, input },
        {
          onSuccess: () => {
            setFormOpen(false);
            showToast("Task updated", "success");
          },
          onError: () => showToast("Could not update task", "error"),
        },
      );
    } else {
      createTask.mutate(input, {
        onSuccess: () => {
          setFormOpen(false);
          showToast("Task added", "success");
        },
        onError: () => showToast("Could not add task", "error"),
      });
    }
  }

  function handleToggleComplete(task: Task, completed: boolean) {
    updateTask.mutate(
      { id: task.id, input: { completed } },
      { onError: () => showToast("Could not update task", "error") },
    );
  }

  function confirmDelete() {
    if (!deletingTask) return;
    deleteTask.mutate(deletingTask.id, {
      onSuccess: () => {
        setDeletingTask(null);
        showToast("Task deleted", "success");
      },
      onError: () => showToast("Could not delete task", "error"),
    });
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <Heading level={1}>Tasks</Heading>
        <Button onClick={openCreateForm}>
          <Plus className="w-4 h-4" aria-hidden="true" />
          Add Task
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      )}

      {isError && <Text variant="secondary">Could not load tasks.</Text>}

      {tasks && tasks.length === 0 && (
        <Card>
          <EmptyState
            icon={ListTodo}
            title="No tasks planned for today"
            description="Add a task when you are ready to define today's work."
            action={<Button onClick={openCreateForm}>Add Task</Button>}
          />
        </Card>
      )}

      {tasks && tasks.length > 0 && (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={(completed) => handleToggleComplete(task, completed)}
              onEdit={() => openEditForm(task)}
              onDelete={() => setDeletingTask(task)}
            />
          ))}
        </div>
      )}

      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingTask ? "Edit Task" : "Add Task"}
      >
        <TaskForm
          initialValues={editingTask ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormOpen(false)}
          isSubmitting={createTask.isPending || updateTask.isPending}
        />
      </Dialog>

      <Dialog
        open={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        title="Delete task?"
      >
        <Text className="mb-4">This action cannot be undone.</Text>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDeletingTask(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} isLoading={deleteTask.isPending}>
            Delete
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
