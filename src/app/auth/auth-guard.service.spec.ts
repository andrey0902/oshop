import { TestBed, inject } from '@angular/core/testing';
import { AuthGuard } from './auth-guard.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

let authGuardSpy;
let authState;
const state = {
  url: 'test'
};
const config = (flag) => {
   authGuardSpy = jasmine.createSpyObj('Router', ['navigate']);
  // An anonymous user
  authState = {
    displayName: 'testName',
    isAnonymous: true,
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
  };
  const mockMyFireAuth =  {
    get authState() {
      if (flag) {
        return of(authState);
      }
      return of(null);
    }
  };

  TestBed.configureTestingModule({
    providers: [
      AuthGuard,
      {provide: Router, useValue: authGuardSpy},
      {provide: AngularFireAuth, useValue: mockMyFireAuth},
    ]
  });
};

describe('AuthGuardService', () => {


  describe('AuthGuardService exist', () => {
    beforeEach(async() => {
      config(true);
    });
    it('should be created', inject([AuthGuard], (service: AuthGuard) => {
      expect(service).toBeTruthy();
    }));
  });

  describe('When exist user', () => {
    beforeEach(() => {
      config(true);
    });
    it('Then canActivate return true', inject([AuthGuard], (service: AuthGuard) => {
      service.canActivate(null, state)
        .subscribe(val => {
          expect(val).toBeTruthy();
        });
    }));
  });

  describe('When not exist user', () => {
    beforeEach(() => {
      config(false);
    });
    it('Then canActivate return false', inject([AuthGuard], (service: AuthGuard) => {
      service.canActivate(null, state)
        .subscribe(val => {
          expect(val).toBeFalsy();
        });
    }));
  });

});
