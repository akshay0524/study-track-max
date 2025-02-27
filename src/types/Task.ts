
export type TaskCategory = 'study' | 'task' | 'important' | 'personal';

export interface Task {
  id: string;
  title: string;
  description?: string;
  date: Date;
  completed: boolean;
  category: TaskCategory;
  duration?: number;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  dueTime?: string;
}
