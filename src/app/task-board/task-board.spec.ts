import { TestBed } from '@angular/core/testing';
import { TaskBoard } from './task-board';

describe('TaskBoard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskBoard],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should add a task', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    inputs[0].value = 'My task';
    inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = 'To do';
    inputs[1].dispatchEvent(new Event('input'));

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.task-title');
    const status = fixture.nativeElement.querySelector('.task-status');
    expect(title?.textContent).toContain('My task');
    expect(status?.textContent).toContain('To do');
  });

  it('should show empty state', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    const empty = fixture.nativeElement.querySelector('.empty');
    expect(empty?.textContent).toContain('No tasks yet');
  });

  it('should not add a task with empty title', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    inputs[1].value = 'To do';
    inputs[1].dispatchEvent(new Event('input'));

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.task-title');
    expect(title).toBeNull();
  });
});
