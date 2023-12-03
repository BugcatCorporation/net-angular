import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-category-dialog',
  templateUrl: './update-category-dialog.component.html',
  styleUrls: ['./update-category-dialog.component.css']
})
export class UpdateCategoryDialogComponent {
  updateForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateCategoryDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateForm = this.formBuilder.group({
      name: [data.name, [Validators.required]]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
