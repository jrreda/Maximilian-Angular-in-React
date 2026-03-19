import "./Tasks.css";
import type { UserProps } from "../user/dummy-users";
import dummyTasks from "./dummy-tasks";

function Tasks({ selectedUser }: { selectedUser: UserProps | undefined }) {
  if (!selectedUser) {
    return <p id="fallback">Please select a user.</p>;
  }

  const tasks = dummyTasks.filter((task) => task.userId === selectedUser.id);

  return (
    <section id="tasks">
      <header>
        <h2>{selectedUser.name}'s Tasks</h2>
        <menu>
          <button>Add Task</button>
        </menu>
      </header>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} role="option">
            <h3>{task.title}</h3>
            <p>{task.summary}</p>
            <button type="button">Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Tasks;
