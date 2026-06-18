import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  imports: [FormsModule],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.scss',
})
export class TaskFilter {
  @Output() searchChanged = new EventEmitter<string>();

  @Output() statusChanged = new EventEmitter<string>();

  searchText = '';

  selectedStatus = 'All';

  onSearch() {
    this.searchChanged.emit(this.searchText);
  }

  onStatusChange() {
    this.statusChanged.emit(this.selectedStatus);
  }
}
