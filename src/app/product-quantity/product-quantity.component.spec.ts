import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuantityComponent } from './product-quantity.component';
import { ShoppingCardService } from '../shared/services/shopping-card.service';
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
const product = {
  key: '-KrqgOLs07ZkbapP4EGi'
};
describe('ProductQuantityComponent', () => {
  let component: ProductQuantityComponent;
  let fixture: ComponentFixture<ProductQuantityComponent>;
  const shoppingCardServiceSpy =
    jasmine.createSpyObj('SoppingCardService', ['addToCart', 'removeFromCart']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductQuantityComponent
      ],
      providers: [
        { provide: ShoppingCardService, useValue: shoppingCardServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQuantityComponent);
    component = fixture.componentInstance;
    component.shoppingCart = shoppingCart;
    component.product = product;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
