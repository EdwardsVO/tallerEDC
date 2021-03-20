import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class MechGuard implements CanActivate {
  constructor(private _db: CrudService, private _auth: AuthService, private _router: Router){}
  userRole: string;
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    this.userRole = localStorage.getItem('role');
      if(this.userRole === "mechanic"){
        return true;
      }
      else{
        return this._router.parseUrl('**');
      }
  }
  
}
