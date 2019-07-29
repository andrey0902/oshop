import { TestBed, inject } from '@angular/core/testing';

import { SessionService } from './session.service';
import { mockUser } from '../shared/test-helper/mockData';

// let storage;

describe('SessionService', () => {
  beforeEach(() => {
    // storage = jasmine.createSpyObj('localStorage', ['getItem', 'setItem'])
    //   .and.callFake(function (key) {
    //   return store[key];
    // });
    // jasmine.createSpyObj(localStorage, ['setItem'])
    //   .and.callFake(function (key, value) {
    //   return store[key] = value + '';
    // });
    // jasmine.createSpyObj(localStorage, ['clear'])
    //   .and.callFake(function () {
    //   store = {};
    // });
    TestBed.configureTestingModule({
      providers: [SessionService]
    });
  });
  it('should be created', inject([SessionService], (service: SessionService) => {
    expect(service).toBeTruthy();
  }));
});
