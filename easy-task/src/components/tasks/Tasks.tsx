import "./Tasks.css";
import type { TaskProps } from "./dummy-tasks";
import type { UserProps } from "../user/dummy-users";
import Task from "./task/Task";
import { useTasks } from "../../hooks/useTasks";

function Tasks({ selectedUser }: { selectedUser: UserProps | undefined }) {
  const { tasks, onCompleteTask } = useTasks(selectedUser);

  // If no user is selected or no tasks are found, show a fallback message
  if (!selectedUser || !tasks) {
    return <p id="fallback">Please select a user.</p>;
  }

  return (
    <section id="tasks">
      <header>
        <h2>{selectedUser.name}'s Tasks</h2>
        <menu>
          <button>Add Task</button>
        </menu>
      </header>

      {tasks.length > 0 ? (
      <ul>
        {tasks.map((task: TaskProps) => (
          <li key={task.id} role="option">
            <Task task={task} onCompleteTask={(id: string) => onCompleteTask(id)} />
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
