import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

// SweetAlert
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import * as ingresoEgreso from '../ingreso-egreso/ingreso-egreso.reducers';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  tipo: string = 'ingreso';
  loading: Subscription = new Subscription();
  cargando: boolean;

  constructor(
    private ingEgrService: IngresoEgresoService,
    private store: Store<ingresoEgreso.AppState>
  ) {}

  ngOnInit() {

    // Observamos los cambios en la propiedad
    this.loading = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    })

    this.forma = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(1)),
    });
  }

  ngOnDestroy() {
    // Cuando ya no estemos en el componente, cancelara la escucha
    this.loading.unsubscribe();
  }

  crearIngresoEgreso() {

    // Activamos el reducer que cambiara el valor de la variable
    this.store.dispatch(new ActivarLoadingAction());

    // Copia los valores del formulario y asigna la propiedad tipo a la variable global tipo
    const ingresoEgreso: IngresoEgresoModel = new IngresoEgresoModel({
      ...this.forma.value,
      tipo: this.tipo,
    });

    // Agregar al usuario logado el ingreso-egreso insertado
    this.ingEgrService
      .crearIngresoEgreso(ingresoEgreso)
      .then((response) => {
        // Desactivamos flag
        this.store.dispatch(new DesactivarLoadingAction());
        // Mostramos mensaje
        Swal('Creado', ingresoEgreso.descripcion, 'success');
        // Reseteamos el formulario
        this.forma.reset({ monto: 0 });
      })
      .catch((error) => {
        // Desactivamos flag
        this.store.dispatch(new DesactivarLoadingAction());
        console.error(error)
      });
  }
}
