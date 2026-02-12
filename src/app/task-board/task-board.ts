import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type TaskStatus = 'To Do' | 'In Progress' | 'Done';

interface Task {
  title: string;
  status: TaskStatus;
}

@Component({
  selector: 'app-task-board',
  imports: [FormsModule],
  templateUrl: './task-board.html',
  styleUrl: './task-board.scss',
})
export class TaskBoard {
  protected readonly STATUSES: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
  protected readonly tasks = signal<Task[]>([]);
  protected readonly newTitle = signal('');
  protected readonly newStatus = signal<TaskStatus | ''>('');
  protected readonly titleError = signal(false);
  protected readonly statusError = signal(false);

  protected addTask() {
    const title = this.newTitle().trim();
    const status = this.newStatus();

    if (!title) {
      this.titleError.set(true);
    }
    if (!status) {
      this.statusError.set(true);
    }
    if (!title || !status) return;

    this.titleError.set(false);
    this.statusError.set(false);
    this.tasks.update((tasks) => [...tasks, { title, status }]);
    this.newTitle.set('');
    this.newStatus.set('');
  }
}
