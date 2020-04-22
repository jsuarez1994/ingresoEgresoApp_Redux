import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ingresoEgresoListenerSusb: Subscription = new Subscription();
  ingresoEgresoItemsSusb: Subscription = new Subscription();

  cancelarSubscription() {
    this.ingresoEgresoItemsSusb.unsubscribe();
    this.ingresoEgresoListenerSusb.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {
    const user = this.authService.getUser();

    return this.afDB
      .doc(`${user.uid}/ingreso-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  initIngresoEgresoListener() {
    // Controlamos con pipe(...) que si al principio vemos que el auth es nulo, 
    // no llega al subscribe
    this.ingresoEgresoListenerSusb=this.store.select('auth')
    .pipe( filter( auth => auth.user != null) )
    .subscribe(auth => { this.getAllIngresoEgresoItems(auth.user.uid); });

  }


  private getAllIngresoEgresoItems( uid: string) {
    // Indicamos la ruta a la que vamos a obtener los items
    this.ingresoEgresoItemsSusb=this.afDB.collection(`${ uid }/ingreso-egresos/items`)
    .snapshotChanges()
    .pipe( map( docData => {
            return docData.map( doc => {
              return {
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data()
              };
            });
          })
    )
    .subscribe( (coleccion) => {
      this.store.dispatch(new SetItemsAction(coleccion));
    });
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.authService.getUser();

    return this.afDB.doc(`${user.uid}/ingreso-egresos/items/${uid}`)
    .delete();
  }

}
