import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {BehaviorSubject, Observable} from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _user$ = new BehaviorSubject<firebase.User | null>(null);

  constructor(private db: AngularFireDatabase) { }

  getUser(): Observable<firebase.User> {
   return this._user$.asObservable();
  }

  setUser(user: firebase.User) {
    this._user$.next(user);
    // ToDo: need save to session storage and locale storage
  }

  saveUser(user: firebase.User) {
    this.db.object(`/users/${user.uid}`)
      .update({
        name: user.displayName,
        email: user.email
      });
  }

  getFBUser(uid: string): AngularFireObject<{}> {
    return this.db.object(`/users${uid}`);
  }
}
