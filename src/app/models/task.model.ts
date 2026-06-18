export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  assignee?: string;
  dueDate: string;
}

export type CreateTaskDTO = Omit<Task, 'id'>;
