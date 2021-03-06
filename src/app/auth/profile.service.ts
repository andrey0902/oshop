import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {BehaviorSubject, Observable} from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _user$ = new BehaviorSubject<firebase.User | null>(null);
  private objectUser$ = new BehaviorSubject<User | null>(null);

  constructor(private db: AngularFireDatabase) { }

  getObjectUser(): Observable<User> {
    return this.objectUser$.asObservable();
  }

  setObjectUser(user: User) {
    this.objectUser$.next(user);
  }

  getUser(): Observable<firebase.User | null> {
   return this._user$.asObservable();
  }

  setUser(user: firebase.User) {
    this._user$.next(user);
  }

  saveUser(user: firebase.User): Promise<void> {
   return this.db.object(`/users/${user.uid}`)
      .update({
        name: user.displayName,
        email: user.email,
        exist: true
      });
  }

  getFBUser(uid: string): AngularFireObject<User> {
    return this.db.object(`/users/${uid}`);
  }
}
