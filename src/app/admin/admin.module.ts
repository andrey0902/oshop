import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageDataService } from './shared/services/manage-data.service';
import { InputLastModule } from '../input-last/input.module';
import { CardModule } from '../shared/card/card.module';
import { ResolveDataService } from './shared/services/resolve-data.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputLastModule,
    CardModule
  ],
  declarations: [ProductFormComponent],
  providers: [
    ManageDataService,
    ResolveDataService
  ]
})
export class AdminModule { }
