import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMatComponent } from './confirm-mat.component';

describe('ConfirmMatComponent', () => {
  let component: ConfirmMatComponent;
  let fixture: ComponentFixture<ConfirmMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
