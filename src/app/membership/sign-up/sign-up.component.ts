import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperValidators } from '../../shared/helper-validators';
import { AuthService } from '../../auth/auth-service.service';
import { Subject } from 'rxjs/index';
import { switchMap, takeUntil } from 'rxjs/internal/operators';
import { ProfileService } from '../../auth/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject();
  signUp: FormGroup;
  hidePassword = false;
  hideConfirmPassword = false;
  serverError = null;
  shoveSpinner = false;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private profileService: ProfileService,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.authService.redirectUrl = '/';
  }

  loginGoogle() {
    this.authService.loginG();
  }

  createForm() {
    this.signUp = this.fb.group({
      displayName: [null, [
        Validators.required,
        Validators.maxLength(18),
        Validators.minLength(3),
        HelperValidators.checkSpace
      ]],
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
      ]],
      password2: [null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(8),
        HelperValidators.checkSpace,
      ]]
    }, {
      validator: HelperValidators.passwordMatch2('password', 'password2')
    });
  }

  sendSingUp() {
    if (this.signUp.valid) {
      this.authService.cancelStateChange.next(true);
      this.shoveSpinner = true;
      this.authService.signUpWithEmail(this.signUp.value)
        .pipe(takeUntil(this.onDestroy$),
          switchMap(this.placeUser()))
        .subscribe((res: any) => {

          this.shoveSpinner = false;
          this.router.navigate(['/auth/login']);

        }, error => {
         console.warn('error', error);
         this.shoveSpinner = false;
         this.serverError = error.message;
        });
    }
  }

  placeUser() {
    return (user: any) => {
      this.signUp.value['uid'] = user.user.uid;
      return this.profileService.saveUser(this.signUp.value);
    };
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

}
