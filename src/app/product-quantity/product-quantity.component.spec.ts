import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuantityComponent } from './product-quantity.component';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Product } from '../shared/models/product';
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
    return product ? 1 : 0;
  }
};
const product = {
  key: '-KrqgOLs07ZkbapP4EGi',
  title: 'test'
};
describe('ProductQuantityComponent', () => {
  let component: ProductQuantityComponent;
  let fixture: ComponentFixture<ProductQuantityComponent>;
  const ShoppingCartServiceSpy =
    jasmine.createSpyObj('SoppingCardService', ['addToCart', 'removeFromCart']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductQuantityComponent
      ],
      providers: [
        { provide: ShoppingCartService, useValue: ShoppingCartServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQuantityComponent);
    component = fixture.componentInstance;
    component.shoppingCart = shoppingCart;
    component.product = (product as Product);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
