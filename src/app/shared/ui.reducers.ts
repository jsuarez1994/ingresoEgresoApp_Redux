import * as uiActions from './ui.actions';

export interface State {
    isLoading: boolean;
}


const initState: State = {
    isLoading: false
};

export function uiReducer(state = initState, action: uiActions.Acciones): State {
    switch (action.type) {
        case uiActions.ACTIVAR_LOADING:
            return {
                isLoading: true
            };
        case uiActions.DESACTIVAR_LOADING:
            return{
                isLoading: false
            };
        default:
            return state;
    }
}
