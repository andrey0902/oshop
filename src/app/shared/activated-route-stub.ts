import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { of, ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  get paramMap() {
    return of({
      get (s) {
        return null;
      }
    });
  }
}
