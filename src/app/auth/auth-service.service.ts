import { Injectable } from '@angular/core';
import * as fireBase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {ProfileService} from './profile.service';
import {Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './session.service';

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
    this.setReturnUrl();
  }

  checkChangeUser() {
    this.afAuth.authState.
      pipe(takeUntil(this.onDestroy$))
        .subscribe(user => {
          if (!user) {
            return this.profile.setUser(null);
          }
          // redirect after login
          const url  = SessionService.getReturnUrl();
          SessionService.setReturnUrl(null);

            this.router.navigate([url || '/']);

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
    return this.afAuth.auth.signInWithRedirect(
      new fireBase.auth.GoogleAuthProvider()
    );
  }

  logout() {
   return this.afAuth.auth.signOut().then(value => this.router.navigate(['/login']));
  }

  public setReturnUrl() {
   this.route.queryParamMap.subscribe(params => {
     SessionService.setReturnUrl(params.get('returnUrl'));
   });
  }

}
