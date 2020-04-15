import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore
  ) {}

  newUser(nombre: string, email: string, password: string) {
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
          this.router.navigate(['/']);
        })
        .catch(error => {
          Swal('Error en el login', error.message, 'error');
        });

      })
      .catch((error) => {
        Swal('Error en el login', error.message, 'error');
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        Swal('Error en el login', error.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    // Cerrar sesion
    this.afAuth.auth.signOut();
  }
}
