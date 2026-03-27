import "./Tasks.css";
import type { TaskProps } from "./dummy-tasks";
import type { UserProps } from "../user/dummy-users";
import Task from "./task/Task";
import { useTasks } from "../../hooks/useTasks";
import NewTask from "./new-task/NewTask";
import { useState } from "react";

function Tasks({ selectedUser }: { selectedUser: UserProps | undefined }) {
  const { tasks, onCompleteTask, onAddTask } = useTasks(selectedUser);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  const handleCancelAddTask = () => {
    setIsAddingTask(false);
  };

  const createNewTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submit");
    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const dueDate = formData.get("due-date") as string;

    const newTask: TaskProps = {
      id: crypto.randomUUID(),
      userId: selectedUser?.id ?? "",
      title,
      summary,
      dueDate,
    };

    onAddTask(newTask, selectedUser?.id ?? "");
    setIsAddingTask(false);
  };

  // If no user is selected or no tasks are found, show a fallback message
  if (!selectedUser || !tasks) {
    return <p id="fallback">Please select a user.</p>;
  }

  return (
    <section id="tasks">
      <header>
        <h2>{selectedUser.name}'s Tasks</h2>
        <menu>
          <button type="button" onClick={handleAddTask}>
            Add Task
          </button>
        </menu>
      </header>

      {/* Add Task Dialog */}
      {isAddingTask && (
        <NewTask
          isOpen={isAddingTask}
          onSubmit={createNewTask}
          onCancel={handleCancelAddTask}
        />
      )}

      {/* Tasks List */}
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task: TaskProps) => (
            <li key={task.id} role="option">
              <Task
                task={task}
                onCompleteTask={(id: string) => onCompleteTask(id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p id="fallback">No tasks found.</p>
      )}
    </section>
  );
}

export default Tasks;
