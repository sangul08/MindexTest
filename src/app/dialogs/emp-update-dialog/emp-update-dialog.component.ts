import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {EmployeeService} from '../../employee.service'
import { catchError } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/employee';

@Component({
  selector: 'app-emp-update-dialog',
  templateUrl: './emp-update-dialog.component.html',
  styleUrls: ['./emp-update-dialog.component.css']
})
export class EmpUpdateDialogComponent implements OnInit {
    public form: FormGroup;
    myData = this.data;
    status;
    warningMessage;
    sendingEmail = false;
    errorMessage: string;
    employee: Employee = new Employee();
    constructor(public dialogRef: MatDialogRef<EmpUpdateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, public employeeService: EmployeeService, private fb: FormBuilder) { }

    ngOnInit() {
      this.form = this.fb.group({
        firstName: new FormControl( {value: this.data.employee.firstName, disabled: true}),
        lastName: new FormControl({value: this.data.employee.lastName, disabled: true}),
        position: new FormControl({value: this.data.employee.position, disabled: true}),
        compensation: new FormControl({value: this.data.employee.compensation, disabled: false}, [Validators.required]),
    });
    }
    onNoClick():  void {
        this.dialogRef.close();
    }

    cancel() {
        console.log('You are in the Cancel Button of the dialog');
        this.dialogRef.close();
    }

    save() {
        console.log('You are in the Save Button of the dialog');
        this.employee.firstName = this.data.employee.firstName;
        this.employee.lastName = this.data.employee.lastName;
        this.employee.directReports = this.data.employee.directReports;
        this.employee.id = this.data.employee.id;
        this.employee.position = this.data.employee.position;
        this.employee.compensation = this.form.controls['compensation'].value;
        this.employeeService.save(this.employee).pipe(
          catchError(this.handleDeleteError.bind(this))
        ).subscribe();
        this.dialogRef.close();
    }

    private handleDeleteError(e: Error | any): string {
      console.error(e);
      return this.errorMessage = e.message || 'Unable to delete employee';
    }

}
