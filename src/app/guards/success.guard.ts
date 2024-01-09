import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { RegisterService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class SuccessGuard implements CanActivate {
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.registerService.returnRegister() == 'true') {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
