import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityDialogComponent } from './university-dialog.component';

describe('UniversityDialogComponent', () => {
  let component: UniversityDialogComponent;
  let fixture: ComponentFixture<UniversityDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversityDialogComponent]
    });
    fixture = TestBed.createComponent(UniversityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
