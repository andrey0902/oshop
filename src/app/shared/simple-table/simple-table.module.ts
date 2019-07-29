import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    NgxDatatableModule,
    MatButtonModule,
  ],
  declarations: [
    SimpleTableComponent,
    ViewOrderComponent,
  ],
  exports: [
    SimpleTableComponent,
    ViewOrderComponent
  ],
  entryComponents: [
    ViewOrderComponent
  ]
})
export class SimpleTableModule { }
