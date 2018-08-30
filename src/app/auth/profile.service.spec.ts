import { TestBed, inject } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { fbUser, mockUser, successPromise } from '../shared/test-helper/mockData';
import { of } from 'rxjs/index';
import { User } from '../shared/models/user';

describe('ProfileService', () => {
  const angularFireDatabaseSpy = jasmine.createSpyObj('AngularFireDatabase', ['object']);
  angularFireDatabaseSpy.object.and.returnValue({
    snapshotChanges() {
      return of(new User(mockUser));
    }
  });
  const user = mockUser;

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
    const tempUser: any = fbUser;
    service.setUser(tempUser);
    service.getUser()
      .subscribe((value: any) => {
        expect(value.displayName).toEqual(fbUser.displayName);
      });
  }));

  it('should be call method update', inject([ProfileService], (service: ProfileService) => {

    angularFireDatabaseSpy.object.and.returnValue({update(val) {
      return successPromise;
    }});
    const tempUser: any = fbUser;
    service.saveUser(tempUser).then(val => {
      expect(val).toBeTruthy();
    });

    expect(angularFireDatabaseSpy.object).toHaveBeenCalled();

  }));

  it('getFBUser should be return Observable mockUser',
    inject([ProfileService], (service: ProfileService) => {
      angularFireDatabaseSpy.object.and.returnValue({
        snapshotChanges() {
          return of(new User(mockUser));
        }
      });
     service.getFBUser('1')
        .snapshotChanges().subscribe((res: any) => {
        expect(res.email).toBe(mockUser.email);
      });
    }));
});
