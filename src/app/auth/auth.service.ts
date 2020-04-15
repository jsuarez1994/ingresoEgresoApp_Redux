import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

// Model
import { User } from './user.model';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';

// SweetAlert
import Swal from 'sweetalert2';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUsertAction } from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private suscription: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) {}

  newUser(nombre: string, email: string, password: string) {

    // Llamamos al reducir que pondre isLoading = true
    this.store.dispatch(new ActivarLoadingAction());

    // Registros Firebase
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const user: User = {
          nombre: nombre,
          uid: response.user.uid,
          email: response.user.email,
        };

        // Agregaremos una coleccion
        this.afDB.doc(`${user.uid}/usuario`)
        .set( user )
        .then( () => {
          this.store.dispatch(new DesactivarLoadingAction());
          this.router.navigate(['/']);
        })
        .catch(error => {
          this.store.dispatch(new DesactivarLoadingAction());
          Swal('Error en el login', error.message, 'error');
        });

      })
      .catch((error) => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal('Error en el login', error.message, 'error');
      });
  }

  login(email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.store.dispatch(new DesactivarLoadingAction());
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal('Error en el login', error.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    // Cerrar sesion
    this.afAuth.auth.signOut();
  }


  initAuthListener() {
    /** Si nos hemos logeado entrara en el if y guardara en el store
     * el usuario logado, pero una vez, el usuario ya cierre session
     * como hemos cerrado la sesion de firebase con this.afAuth.auth.signOut();
     * el usuario ya no estara en la sesion y entonces no entrara en el if, si no en el else
     */
    this.afAuth.authState.subscribe(fbUser => {
      if (fbUser) {
        this.suscription = this.afDB.doc(`${ fbUser.uid }/usuario`).valueChanges().subscribe((userFB: any) => {
          this.store.dispatch(new SetUsertAction( new User(userFB) ));
        });
      } else {
        this.suscription.unsubscribe();
      }
    });
  }

}
