import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-stats',
  imports: [],
  templateUrl: './task-stats.html',
  styleUrl: './task-stats.scss',
})
export class TaskStats implements OnChanges {
  @Input() tasks: Task[] = [];

  totalTasks = 0;
  pendingTasks = 0;
  inProgressTasks = 0;
  completedTasks = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'] && this.tasks) {
      const counts = this.tasks.reduce(
        (acc, task) => {
          const status = task.status?.toLowerCase();
          if (status === 'pending') acc.pending++;
          else if (status === 'in progress') acc.inProgress++;
          else if (status === 'completed') acc.completed++;
          return acc;
        },
        { pending: 0, inProgress: 0, completed: 0 },
      );

      this.totalTasks = this.tasks.length;
      this.pendingTasks = counts.pending;
      this.inProgressTasks = counts.inProgress;
      this.completedTasks = counts.completed;
    }
  }
}
