import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';
import { ProfileService } from './profile.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthService,
              private profil: ProfileService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.profil.getUser()
      .pipe( switchMap((user) => {

        return this.profil.getFBUser(user.uid).valueChanges()
          .pipe(map((val => {
                return val.isAdmin;
              })
          ));
      }));
  }
}
