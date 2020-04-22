import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>) { }

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


  borrarItem(uid: string) {
    console.log(uid);
  }

}
