import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private afAuth: AngularFireAuth) { }

  canActivate(route: any, state): Observable<boolean> {
    return this.afAuth.authState
      .pipe( map(value => {
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
