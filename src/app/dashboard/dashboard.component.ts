import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    // Cargamos toda la lista de ingresos y egresos
    this.ingresoEgresoService.initIngresoEgresoListener()
  }

}
