import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  companyEditForm = this.formBuilder.group(this.data);
  constructor(private formBuilder:FormBuilder, public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company) { }

  ngOnInit(): void {
    
  }
  save(): void {
    this.dialogRef.close(this.companyEditForm.getRawValue());
  }
}
