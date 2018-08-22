import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth-service.service';
import { ProfileService } from '../../auth/profile.service';
import { Router } from '@angular/router';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { ServerNonErrorModule } from '../../shared/server-error-non/server-error.module';
import { InputModule } from '../../shared/input/input.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const spyAuth = jasmine.createSpyObj('AuthService', ['redirectUrl', 'cancelStateChange', 'loginWithEmail', 'loginG']);
    const spyProfile = jasmine.createSpyObj('ProfileService', ['setObjectUser', 'setUser', 'getFBUser', 'loginG']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
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
    expect(component.singIn.invalid).toBeTruthy();
  });
});
