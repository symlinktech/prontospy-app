import {CanActivate, Router} from '@angular/router';
import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { BehaviorSubject, Observable, Subject, of, throwError } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
isLoggedIn:boolean;
isLoggedStorage:any;
userRole:any;
userImage:any;
sidebarVisibilityChange: Subject<any> = new Subject<any>();
  constructor( private router: Router) {
    this.sidebarVisibilityChange.subscribe((value) => {
            this.isLoggedIn = value
            this.isLoggedStorage=value
            this.userRole=value
            this.userImage=value
        });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const redirectUrl = route['_routerState']['url'];

    if (this.isLogged()) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }
  isLogged(){
    if(localStorage.getItem('user_id')!=null && localStorage.getItem('user_id')!='' && localStorage.getItem('user_id')!=undefined) {
      this.isLoggedIn=true
      localStorage.setItem('login_status','true')
      this.isLoggedStorage=localStorage.getItem('login_status')
      this.userRole=localStorage.getItem('role')
    }
    else{
      this.isLoggedIn=false
      localStorage.setItem('login_status','false')
      this.isLoggedStorage=localStorage.getItem('login_status')
      this.userRole=''
    }
    return this.isLoggedIn;
  }
  currentNav(){
    this.router.url
  }
}