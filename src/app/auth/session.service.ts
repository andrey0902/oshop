import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  /**
   * set user in local storage
   * */
  public static setUser(value: any): void {
    localStorage.setItem('o.user', JSON.stringify(value) );
  }
  /**
   * get user from local storage
   * */
  public static getUser() {
    return JSON.parse(localStorage.getItem('o.user'));
  }
  /**
   * set return url in local storage
   * */
  public static setReturnUrl(url: string) {
    SessionService.setStore(url, 'returnUrl');
  }
  /**
   * get user from local storage
   * */
  public static getReturnUrl() {
    return SessionService.getStore('returnUrl');
  }

  /**
   * set user in local storage
   * */
  public static setKey (value: any): void {
    SessionService.setStore(value, 'o.key');
  }
  /**
   * get user from local storage
   * */
  public static getKey() {
    return SessionService.getStore('o.key');
  }

  public static setStore(value, key: string) {
    localStorage.setItem(key, JSON.stringify(value) );
  }

  public static getStore(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
