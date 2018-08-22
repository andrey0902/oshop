import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { ProfileService } from '../../../auth/profile.service';
import { of } from 'rxjs/index';
const profileServiceSpy: jasmine.createSpyObj<ProfileService> =
  jasmine.createSpyObj('ProfileService', ['getObjectUser']);

function config (exist) {
  profileServiceSpy.getObjectUser.and.returnValue(of(exist));
  TestBed.configureTestingModule({
    providers: [
      AuthGuardService,
      { provide: ProfileService, useValue: profileServiceSpy }
    ]
  });
}
describe('AuthGuardService', () => {


  describe('AuthGuardService should be created', () => {

    beforeEach(() => {
      config(true);
    });

    it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
      expect(service).toBeTruthy();
    }));
  });

  describe('CanActivate should be return true', () => {

    beforeEach(() => {
        config(false);
    });

    it('When user is not signIn', inject([AuthGuardService], (service: AuthGuardService) => {
      service.canActivate().subscribe(res => {
        expect(res).toBeTruthy();
      });
    }));
  });

  describe('CanActivate should be return false', () => {

    beforeEach(() => {
      config(true);
    });

    it('When user is not signIn', inject([AuthGuardService], (service: AuthGuardService) => {
      service.canActivate().subscribe(res => {
        expect(res).toBeFalsy();
      });
    }));
  });
});
