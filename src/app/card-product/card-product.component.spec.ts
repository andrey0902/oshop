import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductComponent } from './card-product.component';
import { MatCardModule } from '@angular/material';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ProductQuantityComponent } from '../product-quantity/product-quantity.component';
import { mockProduct } from '../shared/test-helper/mockData';

describe('CardProductComponent', () => {
  let component: CardProductComponent;
  let fixture: ComponentFixture<CardProductComponent>;
  const shoppingCartServiceSpy =
    jasmine.createSpyObj('ShoppingCartService', ['addToCart']);

  const product = mockProduct;
  const shoppingCart = {
    getQuantity(val) {
      return 0;
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardProductComponent,
         ProductQuantityComponent
      ],
      imports: [
        MatCardModule
      ],
      providers: [
        { provide: ShoppingCartService, useValue: shoppingCartServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProductComponent);
    component = fixture.componentInstance;
    component.product = product;
    component.shoppingCart = shoppingCart;
    fixture.detectChanges();
  });

  it('should create mat cart component', () => {
    expect(component).toBeTruthy();
  });

  it('Should be call method addToCart of the service', () => {
    component.addToCart();
    expect(shoppingCartServiceSpy.addToCart.calls.count()).toBe(1);
  });
});
