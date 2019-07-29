import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth-service.service';
import { ProfileService } from '../../auth/profile.service';
import { Router } from '@angular/router';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { ServerNonErrorModule } from '../../shared/server-error-non/server-error.module';
import { InputModule } from '../../shared/input/input.module';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { mockUser } from '../../shared/test-helper/mockData';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const dataValid = {
    email: 'test@gmail.com',
    password: '12345678'
  };
  const dataInvalid = {
    email: '',
    password: ''
  };
  const setFormValue = (isValid) => {
    if (isValid) {
      component.signIn.setValue(dataValid);
      fixture.detectChanges();
      return;
    }
    component.signIn.setValue(dataInvalid);
    fixture.detectChanges();
  };
  let spyAuth;
  let spyProfile;
  let spyRouter;

  beforeEach(async(() => {
    spyAuth = jasmine.createSpyObj('AuthService', ['redirectUrl', 'changeStateSubscription', 'loginWithEmail', 'loginG']);
    spyProfile = jasmine.createSpyObj('ProfileService', ['setObjectUser', 'setUser', 'getFBUser', 'loginG']);
    spyRouter = jasmine.createSpyObj('Router', ['navigate']);
    spyAuth.loginWithEmail.and.returnValue(of({user: {
      uid: 1
    }}));
    spyProfile.getFBUser.and.returnValue({
      snapshotChanges() {
        return of({
          get payload() {
          return {
            val() {
              return mockUser;
            }
          };
        }
        });
      }
    });
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        ServerNonErrorModule,
        InputModule,
        MatIconModule,
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: spyAuth },
        { provide: ProfileService, useValue: spyProfile },
        { provide: Router, useValue: spyRouter },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form after init component', () => {
    expect(component.signIn.invalid).toBeTruthy();
  });

  it('Form should be valid after to type all required field', () => {

    setFormValue(true);
    expect(component.signIn.valid).toBeTruthy();
    expect(component.signIn.get('email').value).toEqual(dataValid.email);
  });

  it('Form should be invalid after to type not valid value', () => {

    setFormValue(false);
    expect(component.signIn.valid).toBeFalsy();
    expect(component.signIn.get('email').value).toEqual('');
  });

  it('Should call loginWithEmail after click submit button and valid state form', () => {

    setFormValue(true);
    component.sendSingIn();
    fixture.detectChanges();
    expect(spyAuth.loginWithEmail.calls.count()).toBe(1);
    expect(spyAuth.loginWithEmail).toHaveBeenCalledWith(dataValid);
  });

  it('Should call loginG after click on button login whit google', () => {

    setFormValue(true);
    const btn = fixture.debugElement.query(By.css('.login-g'));
    btn.triggerEventHandler('click', null);

    expect(spyAuth.loginG.calls.count()).toBe(1);
    expect(spyAuth.loginG).toHaveBeenCalled();
  });

  it('Form is not valid and nothing happen', () => {

    setFormValue(false);
    expect(component.signIn.valid).toBeFalsy();
    component.sendSingIn();
    fixture.detectChanges();
    expect(component.shoveSpinner).toBeFalsy();
  });

  describe('Should be return error', () => {
    beforeEach(() => {
      spyProfile.getFBUser.and.returnValue({
        snapshotChanges() {
        return throwError('This is an error!');
        }
      });
    });

    it('Throw error from login method', () => {

      setFormValue(true);
      expect(component.signIn.valid).toBeTruthy();
      component.sendSingIn();
      fixture.detectChanges();
      expect(component.shoveSpinner).toBeFalsy();
      expect(spyRouter.navigate).not.toHaveBeenCalled();
    });
  });
});
