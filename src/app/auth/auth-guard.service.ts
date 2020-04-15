import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  canActivate() {
    return this.isAuth();
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
