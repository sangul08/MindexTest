import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDeleteDialogComponent } from './emp-delete-dialog.component';

describe('EmpDeleteDialogComponent', () => {
  let component: EmpDeleteDialogComponent;
  let fixture: ComponentFixture<EmpDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
