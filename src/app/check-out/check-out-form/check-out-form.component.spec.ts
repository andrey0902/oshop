import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutFormComponent } from './check-out-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../shared/input/input.module';
import { mockCheckOutForm, mockShoppingCart } from '../../shared/test-helper/mockData';

describe('CheckOutFormComponent', () => {
  let component: CheckOutFormComponent;
  let fixture: ComponentFixture<CheckOutFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOutFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        InputModule
      ],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be emit value when form valid', () => {
    component.checkoutForm.setValue(mockCheckOutForm);
    component.saveOrder.subscribe((val: any) => {
      expect(val.name).toBe(mockCheckOutForm.name);
    });
    component.placeOrder();
  });

  it('Should not be emit value when form invalid', () => {
     component.placeOrder();
    expect(component.checkoutForm.invalid).toBeTruthy();
  });

});
