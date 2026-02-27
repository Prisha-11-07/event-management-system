import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirmation</h2>

    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close="false">No</button>
      <button mat-raised-button color="warn" mat-dialog-close="true">Yes</button>
    </div>
  `,
})
export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}