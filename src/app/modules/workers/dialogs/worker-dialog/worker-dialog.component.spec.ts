import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDialogComponent } from './worker-dialog.component';

describe('WorkerDialogComponent', () => {
  let component: WorkerDialogComponent;
  let fixture: ComponentFixture<WorkerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkerDialogComponent]
    });
    fixture = TestBed.createComponent(WorkerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
