import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from './auth-service.service';
import {ProfileService} from './profile.service';
import {AuthGuard} from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    ProfileService,
    AuthGuard,
    AdminAuthGuard,
  ]
})
export class AuthModule { }
