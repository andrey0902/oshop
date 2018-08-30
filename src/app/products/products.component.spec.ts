import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ManageDataService } from '../shared/services/manage-data.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatListModule, MatProgressSpinnerModule
} from '@angular/material';
import { ListCategoriesComponent } from '../list-categories/list-categories.component';
import { CardProductComponent } from '../card-product/card-product.component';
import { StickyPositionDirective } from '../shared/directives/sticky-position.directive';
import { ProductQuantityComponent } from '../product-quantity/product-quantity.component';
import { mockProduct } from '../shared/test-helper/mockData';

describe('ProductsComponent common', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  const params = {
   get(param) {
      return 'vegetables';
    }
  };
  const products = [
    {'key': '-KrrIkDT19XhPgWo0T0A', 'category': 'vegetables', 'imageUrl': 'jpg', 'price': 3, 'title': 'Freshly Baked Bread'},
    {'key': '-KrvrXbV3rqnFEru_ojw', 'category': 'fruits', 'imageUrl': 'jpg', 'price': 1.75, 'title': 'Avacado'}];
  const categories = [
    {key: 'bread', name: 'Bread'},
    {key: 'vegetables', name: 'Vegetables'}];
  const shoppingCart = {
    allCountProduct: 4,
    items: {
      '-KrqgOLs07ZkbapP4EGi': {
        product: {
          title: 'Spinach',
          price: 2.5,
          category: 'vegetables',
          imageUrl: 'jpg'
        },
        quantity: 3,
        get totalPrice() {
          return 7.5;
        }
      }
    },
    get totalPrice() {
      return 10.5;
    },
    getQuantity(product): string | number {
      const item = this.items[product.key];
      return item ? item.quantity : 0;
    }
  };
  const activateRouteSpy =
    jasmine.createSpyObj('ActivatedRoute', ['queryParamMap']);
  // ToDo: need change params for test exist category or not
  activateRouteSpy.queryParamMap.and.returnValue(of(params));

  const manageDataServiceSpy =
    jasmine.createSpyObj('ManageDataService', [
      'getAllProducts',
      'getCategoryProduct',
      'filterByCategory'
    ]);
  manageDataServiceSpy.getAllProducts.and.returnValue(of(products));
  manageDataServiceSpy.getCategoryProduct.and.returnValue(of(categories));
  manageDataServiceSpy.filterByCategory.and.returnValue([]);

  const ShoppingCartServiceSpy =
    jasmine.createSpyObj('ShoppingCartService', ['getCart']);
  ShoppingCartServiceSpy.getCart.and.returnValue(of(shoppingCart));

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductsComponent,
        ListCategoriesComponent,
        CardProductComponent,
        StickyPositionDirective,
        ProductQuantityComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {get queryParamMap() {
          return of({get() {return 'vegetables'; }});
        }} },
        { provide: ManageDataService, useValue: manageDataServiceSpy },
        { provide: ShoppingCartService, useValue: ShoppingCartServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [
        MatProgressSpinnerModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatChipsModule,
        MatDialogModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return not change products', () => {
    component.products = [mockProduct];
    component.filterByCategory(null);
    expect(component.filterProducts.length).toBe(1);
  });
});
