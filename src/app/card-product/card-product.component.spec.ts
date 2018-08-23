import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductComponent } from './card-product.component';
import { MatCardModule } from '@angular/material';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ProductQuantityComponent } from '../product-quantity/product-quantity.component';
import { Product } from '../shared/models/product';

describe('CardProductComponent', () => {
  let component: CardProductComponent;
  let fixture: ComponentFixture<CardProductComponent>;
  const ShoppingCartServiceSpy =
    jasmine.createSpyObj('ShoppingCartService', ['addToCart']);

  const product: Product = {
    title: 'test',
    price: '55',
    category: 'test',
    imageUrl: 'http://test',
    key: '-tt',
    $key: '-bb'
  };
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
        { provide: ShoppingCartService, useValue: ShoppingCartServiceSpy }
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
});
