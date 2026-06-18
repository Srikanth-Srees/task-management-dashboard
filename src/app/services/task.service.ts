import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Task, CreateTaskDTO } from '../models/task.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  // Use BehaviorSubject to act as a reactive data store
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  loadInitialTasks(): void {
    const apiUrl = environment.apiUrl || 'https://jsonplaceholder.typicode.com/todos';

    this.http
      .get<any[]>(apiUrl)
      .pipe(
        map((todos) =>
          todos.slice(0, 12).map((item) => ({
            id: item.id,
            title: item.title,
            status: item.completed ? 'Completed' : 'Pending',
            priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
            assignee: ['John Doe', 'Alex Morgan', 'Sam Patel', 'Sarah Lee'][
              Math.floor(Math.random() * 4)
            ],
            dueDate: new Date(Date.now() + Math.random() * 864000000).toISOString().slice(0, 10),
          })),
        ),
      )
      .subscribe((tasks) => {
        // Assert the generated types correctly
        this.tasksSubject.next(tasks as Task[]);
      });
  }

  addTask(task: CreateTaskDTO): void {
    const currentTasks = this.tasksSubject.getValue();
    const newTask: Task = {
      ...task,
      id: currentTasks.length > 0 ? Math.max(...currentTasks.map((t) => t.id)) + 1 : 1,
    };
    this.tasksSubject.next([newTask, ...currentTasks]);
  }
}
