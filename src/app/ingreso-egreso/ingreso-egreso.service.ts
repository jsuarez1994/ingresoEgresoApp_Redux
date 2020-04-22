import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(private afDB: AngularFirestore, private authService: AuthService) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {

    const user = this.authService.getUser();

    return this.afDB
      .doc(`${user.uid}/ingreso-egresos`)
      .collection('items').add({ ...ingresoEgreso });
  }

  initIngresoEgresoListener() {

    const user = this.authService.getUser();

    console.log(user.uid);

  }
}
