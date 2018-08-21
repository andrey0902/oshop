import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../shared/input/input.module';
import { CardModule } from '../shared/components/card/card.module';
import { SearchComponent } from './search/search.component';
import { AdminProductsComponent } from './products/admin-products.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminOrdersComponent } from './orders/admin-orders.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { AdminRoutingModule } from './admin-routing.module';
import { SimpleTableModule } from '../shared/simple-table/simple-table.module';
import { ConfirmMatModule } from '../shared/confirm-mat/confirm-mat.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    InputModule,
    CardModule,
    NgxDatatableModule,
    MatButtonModule,
    MatDialogModule,
    SimpleTableModule,
    ConfirmMatModule,
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
     SearchComponent,
    AdminOrdersComponent,
    ],
  exports: [
    SearchComponent,
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ]
})
export class AdminModule { }
