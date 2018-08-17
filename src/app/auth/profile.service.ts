import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {BehaviorSubject, Observable} from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { User } from '../shared/models/user';
import { skip } from 'rxjs/internal/operators';

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
    // ToDo: need save to session storage and locale storage
  }

  saveUser(user: firebase.User): Promise<void> {
    console.log('user', user);
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
