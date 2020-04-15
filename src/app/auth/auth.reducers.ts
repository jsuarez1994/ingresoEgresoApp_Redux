import * as authAction from './auth.actions';
import { User } from './user.model';

export interface State {
    user: User;
}

const initState: State = {
    user: null
};

export function authReducer(state = initState, action: authAction.ActionsAuth): State {
    switch (action.type) {
        case authAction.SET_USER:
            return { user: {...action.user} };
        default:
            return state;
    }
}
