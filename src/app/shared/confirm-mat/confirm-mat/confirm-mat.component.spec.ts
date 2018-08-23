import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMatComponent } from './confirm-mat.component';
import { MatButtonModule, MatDialogModule, MatDialogRef } from '@angular/material';

describe('ConfirmMatComponent', () => {
  let component: ConfirmMatComponent;
  let fixture: ComponentFixture<ConfirmMatComponent>;
  const data = {
    title: 'test question',
    question: 'Are you sure?'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmMatComponent
      ],
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatDialogModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {close() {return null; }}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMatComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
