import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth-service.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(): Observable<boolean> {
   return this.auth.getUserForGuard$().pipe(map(val => val.isAdmin));
  }
}
