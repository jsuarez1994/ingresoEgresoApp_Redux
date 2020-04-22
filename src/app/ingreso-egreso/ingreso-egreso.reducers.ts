import * as ingresoEgresoAction from './ingreso-egreso.actions';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgresoModel[];
}

export interface AppState extends AppState {
    ingresoEgreso: State
}

const initState: State = {
    items: []
};

export function ingresoEgresoReducer(state = initState, action: ingresoEgresoAction.Acciones): State {

    switch(action.type) {

        case ingresoEgresoAction.SET_ITEMS:
            // Iteramos por cada array del action un nuevo elemento que sera
            // igual que el elemento que iteramos, para retornar siempre nuevo estado
            return {
                items: [
                    ...action.items.map(item => {
                        return {...item}
                    })
                ]
            };

        case ingresoEgresoAction.UNSET_ITEMS:
            return {
                items: []
            };

        default:
            return state;
    }

}