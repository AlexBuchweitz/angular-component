import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  status: string;
}

@Component({
  selector: 'app-task-board',
  imports: [FormsModule],
  templateUrl: './task-board.html',
  styleUrl: './task-board.scss',
})
export class TaskBoard {
  protected readonly tasks = signal<Task[]>([]);
  protected newTitle = '';
  protected newStatus = '';

  protected addTask() {
    const title = this.newTitle.trim();
    const status = this.newStatus.trim();
    if (!title || !status) return;

    this.tasks.update((tasks) => [...tasks, { title, status }]);
    this.newTitle = '';
    this.newStatus = '';
  }
}
