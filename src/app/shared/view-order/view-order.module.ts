import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewOrderComponent } from './view-order.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  declarations: [ViewOrderComponent],
  exports: [
    ViewOrderComponent
  ],
  entryComponents: [
    ViewOrderComponent
  ]
})
export class ViewOrderModule {

}
