import { Injectable } from '@angular/core';
import * as fireBase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {ProfileService} from './profile.service';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './session.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  onDestroy$ = new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth,
              private profile: ProfileService,
              private router: Router,
              private route: ActivatedRoute) {

    this.checkChangeUser();
  }

  checkChangeUser() {
    this.afAuth.authState
      .pipe(takeUntil(this.onDestroy$))
        .subscribe(user => {
          if (!user) {
            this.profile.setObjectUser(null);
            return this.profile.setUser(null);
          }
          // redirect after login
          const url  = SessionService.getReturnUrl();
          SessionService.setReturnUrl(null);
            if (url) {
              this.router.navigate([url]);
            }


          // user from register save in db firebase
          this.profile.saveUser(user);
          // used for if the user state change we need update header and hide or show button menu
          this.setObjectUser(user);
          // user from register
          this.profile.setUser(user);
        });
  }


  setObjectUser(user: fireBase.User) {
    if (user) {
      this.profile.getFBUser(user.uid)
        .valueChanges()
        .subscribe(objUser => {
          this.profile.setObjectUser(objUser);
        });
      return;
    }
    this.profile.setObjectUser(null);
  }

  loginG() {
    this.setReturnUrl();
    return this.afAuth.auth.signInWithRedirect(
      new fireBase.auth.GoogleAuthProvider()
    );
  }

  logout() {
   return this.afAuth.auth.signOut().then(value => this.router.navigate(['/login']));
  }

  public setReturnUrl() {
   const url = this.route.snapshot.queryParamMap.get('returnUrl');
    SessionService.setReturnUrl(url || '/');
  }

  getUserForGuard$ () {
   return this.afAuth.authState
     .pipe(switchMap((user) => {
       if (!user) {
         return of(null);
       }
       return this.profile.getFBUser(user.uid).valueChanges();
     }));
  }

}
