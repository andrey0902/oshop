import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary.component';
import { MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, MatListModule } from '@angular/material';
import { ShoppingCart } from '../../models/shopping-cart';

describe('ShoppingCartSummaryComponent', () => {
  let component: ShoppingCartSummaryComponent;
  let fixture: ComponentFixture<ShoppingCartSummaryComponent>;
  const cart = new ShoppingCart({
    key: '-ttt', items: {
      '-KrqgOLs07ZkbapP4EGi': {
        product: {
          category: 'vegetables',
          imageUrl: 'http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg',
          key: '-KrqgOLs07ZkbapP4EGi',
          price: 2.5,
          title: 'Spinach'
        }, quantity: 3
      }
    }
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartSummaryComponent ],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatChipsModule,
        MatDividerModule,
        MatListModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartSummaryComponent);
    component = fixture.componentInstance;
    component.cart = cart;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
