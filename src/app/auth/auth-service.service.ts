import { Injectable } from '@angular/core';
import * as fireBase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {ProfileService} from './profile.service';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './session.service';
import { switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { User } from '../shared/models/user';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  cancelStateChange = new Subject();
  redirectUrl = null;
  sessionService = SessionService;
  constructor(private afAuth: AngularFireAuth,
              private profile: ProfileService,
              private router: Router,
              private route: ActivatedRoute) {

     this.checkChangeUser();
  }

  changeStateSubscription() {
    this.cancelStateChange.next(true);
  }

  checkChangeUser() {
   return this.afAuth.authState
      .pipe(takeUntil(this.cancelStateChange),
        switchMap((user: any) => {
        // check exist user or not
          if (!user) {
            return of(null);
          }
          this.profile.setUser(user);
          return this.profile.getFBUser(user.uid).snapshotChanges()
            .pipe(
              take(1),
              map((fullUser: any) => fullUser.payload.exists() ? fullUser.payload.val() : user));
        }))
        .subscribe(user => {

          if (!user) {
            this.profile.setObjectUser(null);
            return;
          }
          this.handlerForSetUser(user);
        });
  }

  handlerForSetUser(user) {
    if (user.uid) {
      // user from register save in db firebase
      this.profile.saveUser(user).then(() => {
        this.profile.setObjectUser(new User({name: user.displayName, email: user.email}));
        this.redirectUser();
      });
      return;
    }
    this.profile.setObjectUser(user);
    this.redirectUser();
  }

  redirectUser() {
    const url  = this.sessionService.getReturnUrl() || this.redirectUrl;
    SessionService.setReturnUrl(null);
    if (url) {
      this.router.navigate([url]);
    }
  }


  setObjectUser(user) {
    this.profile.setObjectUser(user);
  }

  loginG() {
    this.setReturnUrl();
    return this.afAuth.auth.signInWithRedirect(
      new fireBase.auth.GoogleAuthProvider()
    );
  }

  logout() {
   this.profile.setObjectUser(null);
   return this.afAuth.auth.signOut().then(value => this.router.navigate(['/']));
  }

  signUpWithEmail(data) {
    return fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password));
  }

  loginWithEmail(data) {
    return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password));
  }

  public setReturnUrl() {
   const url = this.route.snapshot.queryParamMap.get('returnUrl');
    this.sessionService.setReturnUrl(url || '/');
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
