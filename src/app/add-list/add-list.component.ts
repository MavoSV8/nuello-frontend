import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {tempList} from "../table-content/table-content.component";



@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent {

  constructor(public dialogRef: MatDialogRef<AddListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: tempList) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
