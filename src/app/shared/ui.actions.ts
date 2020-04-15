import { Action } from '@ngrx/store';

export const ACTIVAR_LOADING = '[UI_LOADING] Cargando';
export const DESACTIVAR_LOADING = '[UI_LOADING] Fin carga';

export class ActivarLoadingAction implements Action {
  readonly type = ACTIVAR_LOADING;
}

export class DesactivarLoadingAction implements Action {
  readonly type = DESACTIVAR_LOADING;
}

export type Acciones = ActivarLoadingAction | DesactivarLoadingAction;
