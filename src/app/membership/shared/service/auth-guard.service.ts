import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../../../auth/profile.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private profileService: ProfileService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.profileService.getObjectUser()
      .pipe(map(user => !user));
  }
}
