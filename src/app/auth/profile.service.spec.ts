import { TestBed, inject } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../shared/models/user';
import * as firebase from 'firebase';

describe('ProfileService', () => {
  const angularFireDatabaseSpy = jasmine.createSpyObj('AngularFireDatabase', ['object', 'object.update']);
  const user: User = new User({
    name: 'user',
    email: 'email',
    exist: true
  });
  const fbUser: firebase.User = {
    uid: 124,
    displayName: 'test',
    email: 'email'
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        { provide: AngularFireDatabase, useValue: angularFireDatabaseSpy }
      ]
    });
  });

  it('should be created', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));

  it('should be return object by user', inject([ProfileService], (service: ProfileService) => {
    service.setObjectUser(user);
    service.getObjectUser()
      .subscribe((value: any) => {
        expect(value.name).toEqual(user.name);
      });
  }));

  it('should be return firebase object user', inject([ProfileService], (service: ProfileService) => {

    service.setUser(user);
    service.getUser()
      .subscribe((value: any) => {
        expect(value.name).toEqual(user.name);
      });
  }));

  it('should be call method update', inject([ProfileService], (service: ProfileService) => {

    angularFireDatabaseSpy.object.and.returnValue({update(val) {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }});
    service.saveUser(fbUser).then(val => {
      expect(val).toBeTruthy();
    });

    expect(angularFireDatabaseSpy.object).toHaveBeenCalled();

  }));
});
