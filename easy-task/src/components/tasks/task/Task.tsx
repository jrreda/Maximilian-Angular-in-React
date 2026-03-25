import "./Task.css";
import type { TaskProps } from "../dummy-tasks";

interface TaskComponentProps {
  task: TaskProps;
  onCompleteTask: (id: string) => void;
}

function Task({ task, onCompleteTask }: TaskComponentProps) {
  return (
    <article>
      <h2>{task.title}</h2>

      <time dateTime={task.dueDate}>
        {new Date(task.dueDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>

      <p>{task.summary}</p>

      <p className="actions">
        <button type="button" onClick={() => onCompleteTask(task.id)}>Complete</button>
      </p>
    </article>
  );
}

export default Task;
