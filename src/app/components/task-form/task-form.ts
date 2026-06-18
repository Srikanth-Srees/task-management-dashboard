import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateTaskDTO } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  @Output() taskAdded = new EventEmitter<CreateTaskDTO>();

  private fb = inject(FormBuilder);

  taskForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    status: ['Pending', Validators.required],
    priority: ['Medium', Validators.required],
    assignee: ['', Validators.required],
    dueDate: ['', Validators.required],
  });

  submit() {
    if (this.taskForm.invalid) {
      return;
    }

    this.taskAdded.emit(this.taskForm.getRawValue() as CreateTaskDTO);

    this.taskForm.reset({
      title: '',
      status: 'Pending',
      priority: 'Medium',
      assignee: '',
      dueDate: '',
    });
  }
}
