import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ingresoEgreso from '../ingreso-egreso.reducers';
import { Subscription } from 'rxjs';
import { IngresoEgresoModel } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;

  sizeIngresos: number;
  sizeEgresos: number;

  subscription: Subscription = new Subscription();

  doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  doughnutChartData: number[] = [];

  constructor(private store:Store<ingresoEgreso.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso').subscribe( elements => {
      this.contarIngresoEgreso(elements.items);
    });
  }

  contarIngresoEgreso(items: IngresoEgresoModel[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.sizeEgresos = 0;
    this.sizeIngresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.sizeIngresos++;
        this.ingresos+=item.monto;
      } else {
        this.sizeEgresos++;
        this.egresos+=item.monto;
      }
    });

    this.doughnutChartData = [this.ingresos, this.egresos];

  }

}
