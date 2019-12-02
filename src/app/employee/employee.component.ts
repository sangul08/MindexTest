import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import {Employee} from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;
  @Input() directReports: Employee[];
  @Output() editFn = new EventEmitter();
  @Output() deleteFn = new EventEmitter();
  showReports = false;

  public Delete(emp: Employee) {
    this.deleteFn.emit({reportingEmp: emp, employee: this.employee});
  }
}
