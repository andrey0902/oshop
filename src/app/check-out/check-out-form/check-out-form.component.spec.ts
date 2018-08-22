import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutFormComponent } from './check-out-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../shared/input/input.module';

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
});
