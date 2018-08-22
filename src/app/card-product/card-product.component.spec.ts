import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductComponent } from './card-product.component';
import { MatCardModule } from '@angular/material';
import { ShoppingCardService } from '../shared/services/shopping-card.service';
import { ProductQuantityComponent } from '../product-quantity/product-quantity.component';
import { Product } from '../shared/models/product';

describe('CardProductComponent', () => {
  let component: CardProductComponent;
  let fixture: ComponentFixture<CardProductComponent>;
  const shoppingCardServiceSpy =
    jasmine.createSpyObj('ShoppingCardService', ['addToCart']);

  const product: Product = {
    title: 'test',
    price: '55',
    category: 'test',
    imageUrl: 'http://test',
    key: '-tt',
    $key: '-bb'
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
        { provide: ShoppingCardService, useValue: shoppingCardServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProductComponent);
    component = fixture.componentInstance;
    component.product = product;
    fixture.detectChanges();
  });

  it('should create mat cart component', () => {
    expect(component).toBeTruthy();
  });
});
