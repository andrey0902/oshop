import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  public tempData;
  constructor(data) {
    this.tempData = data;
  }
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  get paramMap() {
    if (this.tempData) {
      return of({
        get (selector) {
          return 1;
        }
      });
    } else {
      return of({
        get (selector) {
         return null;
        }
      });
    }
  }
  url(par) {
    return of([{path: '', prams: {}}]);
  }
  params() {
    return of('params');
  }
  queryParams () {
  return of('params');
}
  fragment () {
    return of('params');
}
  data() {
    return of('params');
  }
  outlet() {
    return 'test';
  }
  component() {
    return null;
  }
  get snapshot() {
    return {
      get queryParamMap() {
        if (this.tempData) {
          return {
            get (selector) {
              return 'url';
            }
          };
        } else {
          return {
            get(selector) {
              return null;
            }
          };
        }
      }
    };
  }


  get routeConfig() {
    return null;
  }
  get root() {
    return null;
  }
  get parent() {
    return null;
  }
  get firstChild() {
    return null;
  }
  get children() {
    return null;
  }
  get pathFromRoot() {
    return null;
  }
  get queryParamMap() {
    return {
      get() {
        return 'testParams';
      }
    };
  }
  toString() {
    return null;
  }
}
