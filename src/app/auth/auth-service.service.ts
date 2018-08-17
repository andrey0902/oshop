import { Injectable } from '@angular/core';
import * as fireBase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {ProfileService} from './profile.service';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './session.service';
import { switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { User } from '../shared/models/user';
import { map, take } from 'rxjs/internal/operators';


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
      .pipe(takeUntil(this.onDestroy$),
        switchMap((user: any) => {
        // check exist user or not

          if (!user) {
            return of(null);
          }

          return this.profile.getFBUser(user.uid).snapshotChanges()
            .pipe(
              take(1),
              map((fulluser) => fulluser.payload.exists() ? fulluser.payload.val() : user)
            );
        }))
        .subscribe(user => {
          console.log('USER', user);
          if (!user) {
            this.profile.setObjectUser(null);
            return;
          }
          this. handlerForSetUser(user);
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
    const url  = SessionService.getReturnUrl();
    SessionService.setReturnUrl(null);
    if (url) {
      this.router.navigate([url]);
    }
  }


  setObjectUser(user: fireBase.User) {
    // if (user) {
    //   this.profile.getFBUser(user.uid)
    //     .valueChanges()
    //     .subscribe(objUser => {
    //       this.profile.setObjectUser(objUser);
    //     });
    //   return;
    // }
    this.profile.setObjectUser(null);
  }

  loginG() {
    this.setReturnUrl();
    return fromPromise(this.afAuth.auth.signInWithRedirect(
      new fireBase.auth.GoogleAuthProvider()
    ));
  }

  logout() {
   return this.afAuth.auth.signOut().then(value => this.router.navigate(['/auth/login']));
  }

  signUpWithEmail(data) {
    return fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password));
      // .then((user) => {
      // console.log(user);
      //   this.authState = user;
      // })
      // .catch(error => {
      //   console.log(error);
      //   throw error;
      // });
  }

  loginWithEmail(data) {
    return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password));
      // .then((user) => {
      //   this.authState = user;
      //   console.log(user);
      // })
      // .catch(error => {
      //   console.log(error);
      //   throw error;
      // });
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
