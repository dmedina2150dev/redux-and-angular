import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {}

    
  canLoad(): Observable<boolean> {

    return this._auth.isAuth()
     .pipe(
       tap( state => {
         console.log(state)
         if (!state) {
             this._router.navigate(['login']);
         }
       }),
       take(1)
       // TODO: cancela la subscripcion al primer intento
       /**
        * Porque cada vez que se requiere entrar a ese modulo debo realizar
        * Una nueva subscripcion */ 
     );
  }

  canActivate(): Observable<boolean> {

     return this._auth.isAuth()
      .pipe(
        tap( state => {
          console.log(state)
          if (!state) {
              this._router.navigate(['login']);
          }
        })
      );
  }
  
}
