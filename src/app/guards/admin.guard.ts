import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor (private securityService: SecurityService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.securityService.sesionExiste() && this.securityService.verifySesionRole(environment.ID_ROL_ADMIN)) {
      return true;
    } else {
      this.router.navigate(['pages/security/login']);
      return false;
    }
  }
  
}
