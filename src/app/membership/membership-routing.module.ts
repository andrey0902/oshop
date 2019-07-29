import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuardService } from './shared/service/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class MembershipRoutingModule { }
