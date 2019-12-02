import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-emp-delete-dialog',
  templateUrl: './emp-delete-dialog.component.html',
  styleUrls: ['./emp-delete-dialog.component.css']
})
export class EmpDeleteDialogComponent {
  warningMessage = this.data.warning;

  constructor(
      public dialogRef: MatDialogRef<EmpDeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
      this.dialogRef.close();
  }

  saveClicked() {
      this.dialogRef.close('save');
  }
  cancelClicked() {
      this.dialogRef.close('cancel');
  }
}
