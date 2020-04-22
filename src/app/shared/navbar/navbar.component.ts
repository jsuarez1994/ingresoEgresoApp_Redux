import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) { }

  nombre: string;
  subs: Subscription = new Subscription();

  ngOnInit() {
    this.subs = this.store.select('auth')
    .pipe(filter( auth => null != auth.user))
    .subscribe( auth => {this.nombre = auth.user.nombre;});
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
