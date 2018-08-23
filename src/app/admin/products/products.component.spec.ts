import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsComponent } from './admin-products.component';
import { ManageDataService } from '../../shared/services/manage-data.service';
import { SearchComponent } from '../search/search.component';
import { SimpleTableModule } from '../../shared/simple-table/simple-table.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {  Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DummyRouterLinkDirective } from '../../shared/dummy-router-link-directive';
import { of } from 'rxjs';
import { ProductFormComponent } from '../product-form/product-form.component';
import { InputModule } from '../../shared/input/input.module';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { CardProductModule } from '../../card-product/card-product.module';
describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;
  let manageDataServiceSpy;

  manageDataServiceSpy = jasmine.createSpyObj('ManageDataService', ['getAllProducts', 'filterByTitle']);
  manageDataServiceSpy.getAllProducts.and.returnValue(of([{
    category: 'bread',
    imageUrl: 'https://static.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg',
    key: '-KrrIkDT19XhPgWo0T0A',
    price: 3,
    title : 'Freshly Baked Bread'
  }]));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminProductsComponent,
        SearchComponent,
        DummyRouterLinkDirective,
        ProductFormComponent],
      providers: [
        { provide: ManageDataService, useValue: manageDataServiceSpy },
      ],
      imports: [
        SimpleTableModule,
        NgxDatatableModule,
        InputModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'admin/product/new', component: ProductFormComponent },
          { path: 'admin/product/:id', component: ProductFormComponent },
        ]),
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        CardProductModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
