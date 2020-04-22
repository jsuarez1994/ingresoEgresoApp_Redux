// Archivo global que tiene toda la definicion del estado

// Reducers
import * as uiReducers from './shared/ui.reducers';
import * as authReducers from './auth/auth.reducers';
import * as ingresoEgresoReducers from './ingreso-egreso/ingreso-egreso.reducers';

import { ActionReducerMap } from '@ngrx/store';


// Aplicamos el modelo que trataremos en los estados
export interface AppState {
    ui: uiReducers.State;
    auth: authReducers.State;
    ingresoEgreso: ingresoEgresoReducers.State
}

// Fusionar todos los reducers (acciones con los tipos de estados)
export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducers.uiReducer,
    auth: authReducers.authReducer,
    ingresoEgreso: ingresoEgresoReducers.ingresoEgresoReducer
};
