import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpUpdateDialogComponent } from './emp-update-dialog.component';

describe('EmpUpdateDialogComponent', () => {
  let component: EmpUpdateDialogComponent;
  let fixture: ComponentFixture<EmpUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
