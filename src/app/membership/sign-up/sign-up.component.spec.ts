import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../shared/input/input.module';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { ServerNonErrorModule } from '../../shared/server-error-non/server-error.module';
import { AuthService } from '../../auth/auth-service.service';
import { ProfileService } from '../../auth/profile.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { mockUser } from '../../shared/test-helper/mockData';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  const dataValid = {
    displayName: 'test',
    email: 'test@gmail.com',
    password: '12345678',
    password2: '12345678'
  };
  const dataInvalid = {
    displayName: '',
    email: '',
    password: '',
    password2: ''
  };
  const setFormValue = (isValid) => {
    if (isValid) {
      component.signUp.setValue(dataValid);
      fixture.detectChanges();
      return;
    }
    component.signUp.setValue(dataInvalid);
    fixture.detectChanges();
  };
  const authServiceSpy =
    jasmine.createSpyObj('AuthService',
      [
        'loginG',
        'changeStateSubscription',
        'signUpWithEmail',
        'redirectUrl'
      ]);
  const profileServiceSpy =
    jasmine.createSpyObj('ProfileService',
      [
        'saveUser'
      ]);
  const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
  authServiceSpy.signUpWithEmail.and.returnValue(of({user: {
    uid: 1
  }}));

  profileServiceSpy.saveUser.and.returnValue(of(mockUser));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignUpComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        InputModule,
        MatButtonModule,
        MatIconModule,
        ServerNonErrorModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ProfileService, useValue: profileServiceSpy },
        { provide: Router, useValue: spyRouter },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call loginG after click on button login whit google', () => {
    const btn = fixture.debugElement.query(By.css('.login-g'));
    btn.triggerEventHandler('click', null);
    expect(authServiceSpy.loginG.calls.count()).toBe(1);
    expect(authServiceSpy.loginG).toHaveBeenCalled();
  });

  it('Form should be invalid after to type not valid value', () => {
    setFormValue(false);
    expect(component.signUp.valid).toBeFalsy();
    expect(component.signUp.get('email').value).toEqual('');
  });

  it('Form should be valid after to type all required field', () => {
    setFormValue(true);
    expect(component.signUp.valid).toBeTruthy();
    expect(component.signUp.get('email').value).toEqual(dataValid.email);
  });

  it('Form is not valid and nothing happen', () => {
    setFormValue(false);
    expect(component.signUp.valid).toBeFalsy();
    component.sendSingUp();
    fixture.detectChanges();
    expect(component.shoveSpinner).toBeFalsy();
  });

  it('Should call loginWithEmail after click submit button and valid state form', () => {

    setFormValue(true);
    component.sendSingUp();
    fixture.detectChanges();
    expect(authServiceSpy.signUpWithEmail.calls.count()).toBe(1);
  });

  describe('Should be return error', () => {
    beforeEach(() => {
      profileServiceSpy.saveUser.and.returnValue(throwError('This is an error!'));
    });

    it('Throw error from login method', () => {

      setFormValue(true);
      expect(component.signUp.valid).toBeTruthy();
      component.sendSingUp();
      fixture.detectChanges();
      expect(component.shoveSpinner).toBeFalsy();
      expect(spyRouter.navigate).not.toHaveBeenCalled();
    });
  });
});
