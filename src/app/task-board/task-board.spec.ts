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

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'My task';
    input.dispatchEvent(new Event('input'));

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = 'To Do';
    select.dispatchEvent(new Event('change'));

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.task-title');
    const status = fixture.nativeElement.querySelector('.task-status');
    expect(title?.textContent).toContain('My task');
    expect(status?.textContent).toContain('To Do');
  });

  it('should show empty state', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    const empty = fixture.nativeElement.querySelector('.empty');
    expect(empty?.textContent).toContain('No tasks yet');
  });

  it('should clear inputs after adding a task', async () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'My task';
    input.dispatchEvent(new Event('input'));

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = 'To Do';
    select.dispatchEvent(new Event('change'));

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    fixture.detectChanges();

    expect(input.value).toBe('');
    expect(select.value).toBe('');
  });

  it('should not add a task with empty title', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = 'To Do';
    select.dispatchEvent(new Event('change'));

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.task-title');
    expect(title).toBeNull();
  });

  it('should not add a task with whitespace-only title', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '   ';
    input.dispatchEvent(new Event('input'));

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = 'To Do';
    select.dispatchEvent(new Event('change'));

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.task-title');
    expect(title).toBeNull();
    expect(input.classList).toContain('error');
  });

  it('should show error style on title input when adding with empty title', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    expect(input.classList).toContain('error');
  });

  it('should clear error style when typing in title input', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(input.classList).toContain('error');

    input.value = 'A';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.classList).not.toContain('error');
  });

  it('should show error style on select when adding with no status', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'My task';
    input.dispatchEvent(new Event('input'));

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    expect(select.classList).toContain('error');
  });

  it('should clear error style on select when changing status', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(select.classList).toContain('error');

    select.value = 'To Do';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(select.classList).not.toContain('error');
  });

  it('should show error on both title and status when both are empty', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(input.classList).toContain('error');
    expect(select.classList).toContain('error');
  });

  it('should clear error styles on both fields after successful add', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;

    // Trigger both errors
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(input.classList).toContain('error');
    expect(select.classList).toContain('error');

    // Fill in valid data and submit
    input.value = 'My task';
    input.dispatchEvent(new Event('input'));
    select.value = 'To Do';
    select.dispatchEvent(new Event('change'));
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    expect(input.classList).not.toContain('error');
    expect(select.classList).not.toContain('error');
  });

  it('should not add a task with no status selected', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'My task';
    input.dispatchEvent(new Event('input'));

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.task-title');
    expect(title).toBeNull();
  });
});
