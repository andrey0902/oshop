import { Injectable } from '@angular/core';
import * as fireBase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {ProfileService} from './profile.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './session.service';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  onDestroy$ = new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth,
              private profile: ProfileService,
              private router: Router,
              private route: ActivatedRoute) {
    afAuth.authState.
      pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        if (value) {
          this.router.navigate([SessionService.getReturnUrl()]);
          this.profile.saveUser(value);
        }
        // used for if the user state change we need update header and hide or show button menu
        this.profile.setUser(value);
    });

    this.getReturnUrl();
  }

  loginG() {
    return this.afAuth.auth.signInWithRedirect(
      new fireBase.auth.GoogleAuthProvider()
    );
  }

  logout() {
   return this.afAuth.auth.signOut().then(value => this.router.navigate(['/login']));
  }

  public getReturnUrl() {
   const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    SessionService.setReturnUrl(returnUrl || '/');
  }

}
