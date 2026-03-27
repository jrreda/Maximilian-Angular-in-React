import { useState } from "react";
import dummyTasks, { type TaskProps } from "../components/tasks/dummy-tasks";
import type { UserProps } from "../components/user/dummy-users";

export const useTasks = (selectedUser: UserProps | undefined) => {
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);

  // Calculate during render
  const tasks = selectedUser ? dummyTasks.filter((task) => task.userId === selectedUser.id && !completedTaskIds.includes(task.id)) : [];

  const onCompleteTask = (id: string) => {
    console.log(`Completing task ${id}`);
    setCompletedTaskIds((prev) => [...prev, id]);
  };

  const onAddTask = (task: TaskProps, userId: string) => {
    console.log(`Adding task ${task.title}`);
    dummyTasks.push({
      ...task,
      userId,
    });
  };

  return { tasks, onCompleteTask, onAddTask };
};