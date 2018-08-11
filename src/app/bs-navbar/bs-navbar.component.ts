import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth-service.service';
import {ProfileService} from '../auth/profile.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as firebase from 'firebase';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  onDestroy = new Subject();
  user: firebase.User;
  constructor(private authService: AuthService,
              private profile: ProfileService) { }

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
  }

  getUser() {
    this.profile.getUser()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(value => {
        this.user = value;
        console.log('USER', value);
      });
  }

  logout() {
    this.authService.logout();
  }

}
