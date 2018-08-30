import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfileService } from './profile.service';
import { ActivatedRouteStub } from '../shared/activated-route-stub';
import { AuthService } from './auth-service.service';
import {
  fbChanget, fbUser, formData, mockSessionService, mockUser,
  successPromise
} from '../shared/test-helper/mockData';

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const profileServiceSpy = jasmine.createSpyObj('ProfileService',
  ['setUser', 'getFBUser', 'setObjectUser', 'saveUser']);
  profileServiceSpy.getFBUser.and.returnValue({
    snapshotChanges() {
      return of(fbChanget);
    },
    valueChanges() {
      return of(fbChanget);
    }
  });
  profileServiceSpy.saveUser.and.returnValue(new Promise((resolve, reject) => {
    resolve(true);
  }));
let angularFireAuthSpy;



// An anonymous user
const config = (flag) => {

  const tempUser = flag ? fbUser : null;

    angularFireAuthSpy = {
      get authState() {
        return of(tempUser);
      },
      get auth () {
        return {
          signInWithRedirect(data) {
            return true;
          },
          GoogleAuthProvider() {
            return true;
          },
          signOut() {
            return successPromise;
          },
          createUserWithEmailAndPassword(data) {
            return successPromise;
          },
          signInWithEmailAndPassword(data) {
            return successPromise;
          }
        };
      }
    };

  TestBed.configureTestingModule({
    providers: [
      AuthService,
      { provide: Router, useValue: routerSpy },
      { provide: AngularFireAuth, useValue: angularFireAuthSpy },
      { provide: ProfileService, useValue: profileServiceSpy },
      { provide: ActivatedRoute, useValue: new ActivatedRouteStub(false) },
    ]
  });
};

describe('AuthService', () => {


  describe('AuthService exist', () => {
    beforeEach(async() => {
      config(true);
    });
    it('should be created', inject([AuthService], (service: AuthService) => {
      expect(service).toBeTruthy();
    }));
  });
  describe('AuthService call emit subject', () => {
    beforeEach(async() => {
      config(true);
    });

    it('CancelStateChange should be get true after call changeStateSubscription method', inject([AuthService], (service: AuthService) => {
      service.cancelStateChange.subscribe(val => {
        expect(val).toBeTruthy();
      });
      service.changeStateSubscription();
    }));
  });

  describe('AuthService should call the setObjectUser method of the profile service ', () => {
    beforeEach(async() => {
      config(true);
    });

    it('Should be call method setObjectUser', inject([AuthService], (service: AuthService) => {
      profileServiceSpy.setObjectUser.calls.reset();
      service.setObjectUser(null);
      expect(profileServiceSpy.setObjectUser.calls.count()).toBe(1);
    }));
  });

  describe('LoginG', () => {
    beforeEach(async() => {
      config(true);
    });
    it('Should return true if success sign In', inject([AuthService], (service: AuthService) => {
      expect(service.loginG()).toBeTruthy();
    }));
  });
  describe('logout', () => {
    beforeEach(async() => {
      config(true);
    });
    it('Should be call router navigate', inject([AuthService], (service: AuthService) => {
      service.logout();
      expect(routerSpy.navigate.calls.count()).toBe(1);
    }));
    it('Should be call method setObjectUser', inject([AuthService], (service: AuthService) => {
      profileServiceSpy.setObjectUser.calls.reset();
      service.logout();
      expect(profileServiceSpy.setObjectUser.calls.count()).toBe(1);
    }));
  });

  describe('FireBase signIn and signUp', () => {
    beforeEach(async() => {
      config(true);
    });
    it('CreateUserWithEmailAndPassword should return true after call SignUpWithEmail',
      inject([AuthService], (service: AuthService) => {
        service.signUpWithEmail(formData)
          .subscribe(val => {
            expect(val).toBeTruthy();
          });
      }));
    it('signInWithEmailAndPassword should return true after call loginWithEmail',
      inject([AuthService], (service: AuthService) => {
        service.loginWithEmail(formData)
          .subscribe(val => {
            expect(val).toBeTruthy();
          });
      }));
  });

  describe('setReturnUrl', () => {
    beforeEach(async() => {
      config(true);
    });

    it('Should call method setReturnUrl of the Session Service',
      inject([AuthService], (service: AuthService) => {
        (service.sessionService as any) = mockSessionService;
        service.setReturnUrl();
        expect(mockSessionService.setReturnUrl).toHaveBeenCalled();
      }));
  });

  describe('getUserForGuard$', () => {
    beforeEach(async() => {
      config(false);
    });

    it('Should be return null after call afAuth.authState',
      inject([AuthService], (service: AuthService) => {
      service.getUserForGuard$()
        .subscribe(val => {
          expect(val).toBeNull();
        });
      }));
  });

  describe('getUserForGuard$', () => {
    beforeEach(async() => {
      config(true);
    });

    it('Should be return user after call afAuth.authState',
      inject([AuthService], (service: AuthService) => {
        service.getUserForGuard$()
          .subscribe((val: any) => {
            expect(val.payload.val().uid).toBe('test2');
          });
      }));
  });

  describe('checkChangeUser', () => {
    beforeEach(async() => {
      config(false);
    });

    it('Should be return null after call afAuth.authState',
      inject([AuthService], (service: AuthService) => {
        profileServiceSpy.setObjectUser.calls.reset();
        service.checkChangeUser();
          expect(profileServiceSpy.setObjectUser.calls.count()).toBe(1);
      }));
  });

  describe('handlerForSetUser', () => {
    beforeEach(async() => {
      config(false);
    });

    it('Should be call setObjectUser of the profile service',
      inject([AuthService], (service: AuthService) => {
        profileServiceSpy.setObjectUser.calls.reset();
        service.handlerForSetUser(mockUser);
        expect(profileServiceSpy.setObjectUser.calls.count()).toBe(1);
        expect(profileServiceSpy.setObjectUser).toHaveBeenCalledWith(mockUser);
      }));
  });


  // it('CancelStateChange should be get true after emit value', inject([AuthService]), (service: AuthService) => {
  //
  // });

  // describe('When exist user', () => {
  //   beforeEach(() => {
  //     config(true);
  //   });
  //   it('Then canActivate return true', inject([AuthService], (service: AuthService) => {
  //     service.canActivate(null, state)
  //       .subscribe(val => {
  //         expect(val).toBeTruthy();
  //       });
  //   }));
  // });
  //
  // describe('When not exist user', () => {
  //   beforeEach(() => {
  //     config(false);
  //   });
  //   it('Then canActivate return false', inject([AuthService], (service: AuthService) => {
  //     service.canActivate(null, state)
  //       .subscribe(val => {
  //         expect(val).toBeFalsy();
  //       });
  //   }));
  // });

});
