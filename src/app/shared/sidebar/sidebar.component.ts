import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../../app.reducer';
import { UnsetUsertAction } from '../../auth/auth.actions';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre: string;
  subs: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.subs = this.store
      .select('auth')
      .pipe(filter((auth) => null != auth.user))
      .subscribe((auth) => {
        this.nombre = auth.user.nombre;
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  logout() {
    // Borramos del estado toda la informacion del usuario
    this.store.dispatch(new UnsetUsertAction());

    // Borramos todos los elementos del usuario
    this.ingresoEgresoService.cancelarSubscription();

    this.authService.logout();
  }
}
