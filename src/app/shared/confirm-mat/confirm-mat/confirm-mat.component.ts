import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-mat',
  templateUrl: './confirm-mat.component.html',
  styleUrls: ['./confirm-mat.component.scss']
})
export class ConfirmMatComponent implements OnInit {

  constructor(@Optional() public dialogRef: MatDialogRef<ConfirmMatComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  closed(confirm) {
    this.dialogRef.close(confirm);
  }

}
