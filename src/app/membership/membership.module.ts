import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipRoutingModule } from './membership-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../shared/input/input.module';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { ServerNonErrorModule } from '../shared/server-error-non/server-error.module';

@NgModule({
  imports: [
    CommonModule,
    MembershipRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    MatButtonModule,
    MatIconModule,
    ServerNonErrorModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MembershipRoutingModule
  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
  ]
})
export class MembershipModule { }
