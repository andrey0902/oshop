import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../shared/input/input.module';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { ServerNonErrorModule } from '../../shared/server-error-non/server-error.module';
import { AuthService } from '../../auth/auth-service.service';
import { ProfileService } from '../../auth/profile.service';
import { Router } from '@angular/router';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  const authServiceSpy: jasmine.createSpyObj<AuthService> =
    jasmine.createSpyObj('AuthService',
      [
        'loginG',
        'cancelStateChange',
        'signUpWithEmail',
        'redirectUrl'
      ]);
  const profileServiceSpy: jasmine.createSpyObj<ProfileService> =
    jasmine.createSpyObj('ProfileService',
      [
        'saveUser'
      ]);
  const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
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
});
