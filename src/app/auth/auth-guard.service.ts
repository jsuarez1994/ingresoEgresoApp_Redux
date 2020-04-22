import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private router: Router, private afAuth: AngularFireAuth, private authService: AuthService) { }

  canActivate() {
    return this.isAuth();
  }

  canLoad() {
    return this.isAuth().pipe(take(1));
  }

  isAuth() {
    // Retorna true o false, pipe trata la salida y map cambia tipo
    return this.afAuth.authState.pipe(
      map( fbUser => {
        if ( fbUser === null ) {
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }

}
