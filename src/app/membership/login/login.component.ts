import { Component, OnDestroy, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperValidators } from '../../shared/helper-validators';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/index';
import { ProfileService } from '../../auth/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  singIn: FormGroup;
  shoveSpinner = false;
  hidePassword = false;
  serverError = null;
  onDestroy$ = new Subject();
  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.createForm();
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
      this.authService.onDestroy$.next(true);
      this.shoveSpinner = true;
      this.authService.loginWithEmail(this.singIn.value)
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
    // TODO: need do later
    return this.profileService.getFBUser();
  }

  public loginGoogle() {
    this.authService.loginG();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

}
