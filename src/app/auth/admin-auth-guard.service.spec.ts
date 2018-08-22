import { TestBed, inject } from '@angular/core/testing';

import { AdminAuthGuard } from './admin-auth-guard.service';
import { of } from 'rxjs/index';
import { AuthService } from './auth-service.service';
let authServiceSpy;
authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserForGuard$']);
function config(exist) {
  authServiceSpy.getUserForGuard$.and.returnValue(of({isAdmin: exist }));

  TestBed.configureTestingModule({
    providers: [
      AdminAuthGuard,
      {provide: AuthService, useValue: authServiceSpy}
    ]
  });
}

describe('AdminAuthGuardService', () => {



  describe('AdminAuthGuardService be created', () => {

    beforeEach(async() => {
      config(false);
    });

    it('should be created', inject([AdminAuthGuard], (service: AdminAuthGuard) => {
      expect(service).toBeTruthy();
    }));
  });

  describe('AdminAuthGuardService should be return true', () => {

    beforeEach(async() => {
      config(true);
    });

    it('CanActivate should be return true if user is admin', inject([AdminAuthGuard], (service: AdminAuthGuard) => {
      service.canActivate().subscribe((val: boolean) => {
        expect(val).toBeTruthy();
      });
    }));
  });

  describe('AdminAuthGuardService should be return false', () => {

    beforeEach(async() => {
      config(false);
    });

    it('CanActivate should be return false if user is not admin', inject([AdminAuthGuard], (service: AdminAuthGuard) => {
      service.canActivate().subscribe((val: boolean) => {
        expect(val).toBeFalsy();
      });
    }));
  });


});
