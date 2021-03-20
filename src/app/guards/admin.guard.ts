import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isStringLiteral } from 'typescript';
import { AuthService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _db: CrudService, private _auth: AuthService, private _router: Router){}
  userRole: string;
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    this.userRole = localStorage.getItem('role');
      if(this.userRole === "admin"){
        return true;
      }
      else{
        return this._router.parseUrl('/error404');
      }
  }
}
