// Import the Task type if needed
import { Task, validateTodo } from "@/model/todomodel";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ================== FETCHING DATA FROM API (GET)============
export default async function fetchData(): Promise<Task[]> {
  try {
    const response = await fetch(`${apiUrl}/tasks`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    // Parse response as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error(`Failed to fetch data: ${error}`);
  }
}
// ================== CREATING DATA API (POST )============
export const createTodo = async ({ newtodo }: { newtodo: Task }) => {
  const validationResponse = validateTodo({ todo: newtodo });
  if (!validationResponse.success) {
    return { success: false, message: validationResponse.message };
  }
  try {
    const response = await fetch(`${apiUrl}/tasks/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newtodo),
    });
    if (response.ok) {
      const data = await response.json();
      return { success: true, message: "Todo task successfully created!", data };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    console.log(error);
  }
  return { success: true, message: "Todo task successfully created!" };
};
// ================== DELETING DATA API (POST )============
export const deletedTodo = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/tasks/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return { success: true, message: "Task deleted successfully!" };
    } else {
      console.error("Failed to delete task");
      return { success: false, message: "Failed to delete task" };
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    return { success: false, message: "Error deleting task" };
  }
};
