import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartSummuryComponent } from './shopping-cart-summary.component';

describe('ShoppingCartSummuryComponent', () => {
  let component: ShoppingCartSummuryComponent;
  let fixture: ComponentFixture<ShoppingCartSummuryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartSummuryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartSummuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
