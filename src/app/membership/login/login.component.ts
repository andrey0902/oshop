import { Component, OnDestroy, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperValidators } from '../../shared/helper-validators';
import { switchMap, takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProfileService } from '../../auth/profile.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  singIn: FormGroup;
  shoveSpinner = false;
  hidePassword = false;
  serverError = null;
  onDestroy$ = new Subject();
  cancelStateChange = new Subject();
  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private profileService: ProfileService,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.authService.redirectUrl = '/';
  }

  createForm() {
    this.singIn = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.maxLength(40),
        Validators.minLength(8),
        HelperValidators.checkSpace,
        HelperValidators.checkEmail
      ]],
      password: [null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(8),
        HelperValidators.checkSpace,
      ]]
    });
  }
  sendSingUp() {
    if (this.singIn.valid) {
      this.authService.cancelStateChange.next(true);
      this.shoveSpinner = true;
      this.authService.loginWithEmail(this.singIn.value)
        .pipe(takeUntil(this.onDestroy$),
          switchMap(this.getUser()),
          map((res: any) => new User(res.payload.val())))
        .subscribe((res: any) => {
          console.log('RESULT',
            res);
          this.profileService.setObjectUser(res);
          this.shoveSpinner = false;
          this.router.navigate(['/']);

        }, error => {
          console.warn('error', error);
          this.shoveSpinner = false;
          this.serverError = error.message;
        });
    }
  }

  getUser() {
    return (user) => {
      this.profileService.setUser(user);
      return this.profileService.getFBUser(user.user.uid).snapshotChanges();
    };
  }

  public loginGoogle() {
    this.authService.loginG();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

}
