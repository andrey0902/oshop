import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ManageDataService } from './manage-data.service';

@Injectable()
export class ResolveDataService implements Resolve<any> {

  constructor(private manageDataService: ManageDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const uid = route.params.uid;
    // console.log('555666', uid);
    return this.manageDataService.getProduct(uid);
  }
}
