import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/index';
import { ManageDataService } from '../shared/services/manage-data.service';
import { ShoppingCardService } from '../shared/services/shopping-card.service';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatListModule, MatProgressSpinnerModule
} from '@angular/material';
import { ListCategoriesComponent } from '../list-categories/list-categories.component';
import { CardProductComponent } from '../card-product/card-product.component';
import { StickyPositionDirective } from '../shared/directives/sticky-position.directive';
import { ProductQuantityComponent } from '../product-quantity/product-quantity.component';

describe('ProductsComponent', () => {
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
      'getCategoryProduct'
    ]);
  manageDataServiceSpy.getAllProducts.and.returnValue(of(products));
  manageDataServiceSpy.getCategoryProduct.and.returnValue(of(categories));

  const shoppingCardServiceSpy =
    jasmine.createSpyObj('ShoppingCardService', ['getCart']);
  shoppingCardServiceSpy.getCart.and.returnValue(of(shoppingCart));

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
        { provide: ActivatedRoute, useValue: activateRouteSpy },
        { provide: ManageDataService, useValue: manageDataServiceSpy },
        { provide: ShoppingCardService, useValue: shoppingCardServiceSpy },
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
});
