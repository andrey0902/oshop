import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMatComponent } from './confirm-mat.component';
import { MatButtonModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs/index';

describe('ConfirmMatComponent', () => {
  let component: ConfirmMatComponent;
  let fixture: ComponentFixture<ConfirmMatComponent>;
  const data = {
    title: 'test question',
    question: 'Are you sure?'
  };
  const afterCloset = new Subject();
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
        {provide: MatDialogRef, useValue: {close(val) { afterCloset.next(val); }}}
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
  it('should call close', () => {
    const resultClosed = 'test';
    component.closed(resultClosed);
    afterCloset.subscribe((res) => {
      expect(res).toBe(resultClosed);
    });
  });
});
