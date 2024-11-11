export interface Task {
  _id?: string;
  id: string;
  title: string;
  description: string;
  status: "in-progress" | "completed";
  dueDate: string;
  created_at: string;
}

export const validateTodo = (todo: { todo: Task }) => {
  const { id, title, description, status, dueDate } = todo.todo;

  // Check if all required fields are present
  if (!id || typeof id !== "string") {
    return { success: false, message: "Invalid id: ID should be a string." };
  }

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return { success: false, message: "Invalid title: Title cannot be empty." };
  }

  if (!description || typeof description !== "string" || description.trim().length === 0) {
    return { success: false, message: "Invalid description: Description cannot be empty." };
  }

  if (!status || (status !== "in-progress" && status !== "completed")) {
    return { success: false, message: "Invalid status: Status must be 'in-progress' or 'completed'." };
  }

  // Validate dueDate format (ISO format example: "2024-11-07")
  const dueDatePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!dueDate || !dueDate.match(dueDatePattern)) {
    return { success: false, message: "Invalid dueDate: Due date must be in 'YYYY-MM-DD' format." };
  }

  // All checks passed
  return { success: true, message: "Todo validation successful." };
};
