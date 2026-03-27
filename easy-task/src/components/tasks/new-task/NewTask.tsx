import "./NewTask.css";

interface NewTaskProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isOpen: boolean;
}

function NewTask({ onSubmit, onCancel, isOpen }: NewTaskProps) {
  return (
    <dialog
      aria-labelledby="add-task-dialog"
      aria-modal="true"
      role="dialog"
      open={isOpen}
    >
      <h2 id="add-task-dialog">Add Task</h2>
      <form onSubmit={onSubmit} aria-label="Add Task">
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required aria-required="true" autoFocus />
        </p>

        <p>
          <label htmlFor="summary">Summary</label>
          <textarea id="summary" rows={5} name="summary" required aria-required="true"></textarea>
        </p>

        <p>
          <label htmlFor="due-date">Due Date</label>
          <input type="date" id="due-date" name="due-date" required aria-required="true" />
        </p>

        <p className="actions">
          <button type="button" onClick={onCancel} aria-label="Cancel">
            Cancel
          </button>
          <button type="submit" aria-label="Create">
            Create
          </button>
        </p>
      </form>
    </dialog>
  );
}

export default NewTask;
