import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProfileService} from './profile.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private profile: ProfileService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.profile.getUser()
      .pipe(map(value => {
        console.log('GUARD', value);
        if (value) {
          return true;
        }
        this.router.navigate(['/login'], {
          queryParams: {
              returnUrl: state.url
            }
        });
        return false;
      }));
  }
}
