import { Action } from '@ngrx/store';
import { User } from './user.model';

export const SET_USER = '[AUTH] SET_USER';

export class SetUsertAction implements Action {
    readonly type = SET_USER;
    constructor(public user: User) {}
}

export type ActionsAuth = SetUsertAction;
