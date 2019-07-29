import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmMatComponent } from './confirm-mat/confirm-mat.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    ConfirmMatComponent,
  ],
  entryComponents: [
    ConfirmMatComponent
  ],
  exports: [
    ConfirmMatComponent
  ]
})
export class ConfirmMatModule { }
