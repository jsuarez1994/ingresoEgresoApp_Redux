import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
//import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import * as ingresoEgreso from '../ingreso-egreso.reducers';

// SweetAlert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  constructor(private store:Store<ingresoEgreso.AppState>, 
              private ingresoEgresoService: IngresoEgresoService) { }

  listItem: IngresoEgresoModel[];
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso').subscribe( items => {
      this.listItem = items.items;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  borrarItem(item: IngresoEgresoModel) {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
    .then(() => {
      Swal('Eliminado', item.descripcion ,'success');
    })
  }

}
