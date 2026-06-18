import { Component, inject, OnInit, computed, signal, effect } from '@angular/core';
import { TaskList } from '../task-list/task-list';
import { TaskStats } from '../task-stats/task-stats';
import { TaskFilter } from '../task-filter/task-filter';
import { TaskForm } from '../task-form/task-form';
import { TaskService } from '../../services/task.service';
import { Task, CreateTaskDTO } from '../../models/task.model';

@Component({
  selector: 'app-dashboard',
  imports: [TaskList, TaskStats, TaskFilter, TaskForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private taskService = inject(TaskService);

  tasks = signal<Task[]>([]);
  searchText = signal('');
  selectedStatus = signal('All');

  filteredTasks = computed(() => {
    const search = this.searchText().toLowerCase();
    const status = this.selectedStatus();

    return this.tasks().filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(search);
      const matchesStatus = status === 'All' || task.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  ngOnInit(): void {
    // Sync the service's BehaviorSubject with our local signal
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks.set(tasks);
    });
    this.taskService.loadInitialTasks();
  }

  onSearch(value: string): void {
    this.searchText.set(value);
  }

  onStatusChange(value: string): void {
    this.selectedStatus.set(value);
  }

  addTask(task: CreateTaskDTO) {
    this.taskService.addTask(task);
  }
}
