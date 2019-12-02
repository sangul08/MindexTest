import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material';
import { EmpDeleteDialogComponent } from '../dialogs/emp-delete-dialog/emp-delete-dialog.component';
import { EmpUpdateDialogComponent } from '../dialogs/emp-update-dialog/emp-update-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;
  warningMessage = 'Are you sure you want to delete this employee ';

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    console.log('Get employees called');
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
      console.log(this.employees);
  }

  private onEditFn(emp: Employee) {
    console.log('Edit called');
    console.log(emp);
    const dialogRef = this.dialog.open(EmpUpdateDialogComponent, {
      width: '50%',
      data: { employee: emp}, // data holds the information we are giving to the dialog component
      disableClose: true // disables closing bfrom clicking outside the dialog
  });
    dialogRef.afterClosed().subscribe(data => {
     this.getEmployees();
    });
  }

  private attachReports(emp: Employee) {
    if (emp.directReports && emp.directReports.length > 0) {
      const reports = [];
      emp.directReports.map((id) => {
          const e = this.employees.find(x => x.id === id);
          reports.push(e);
      });
      return reports;
    }
    return null;
  }

  public onDeleteFn($event) {
    console.log('Delete called');
    const dialogRef = this.dialog.open(EmpDeleteDialogComponent, {
      width: '50%',
      data: {
        warning: this.warningMessage + ' - ' + $event.reportingEmp.firstName + ' ' + $event.reportingEmp.lastName + '" ?'
      },
      disableClose: true // disables closing bfrom clicking outside the dialog
  });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      // console.log($event.employee);
      // // If the No button was clicked then we do nothing
      if (result === 'cancel') {
          return;
      } else {
        const index: number = $event.employee.directReports.indexOf($event.reportingEmp.id);
        if (index !== -1) {
          $event.employee.directReports.splice(index, 1);
        }
        this.employeeService.save($event.employee).pipe(
          catchError(this.handleDeleteError.bind(this))).subscribe();
        // ).subscribe(data => {
        //   this.getEmployees();
        //  });
      }
    });
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }

  private handleDeleteError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to delete employee';
  }
}
