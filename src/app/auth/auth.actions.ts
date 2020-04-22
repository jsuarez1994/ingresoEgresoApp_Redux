import { Action } from '@ngrx/store';
import { User } from './user.model';

export const SET_USER = '[AUTH] SET_USER';
export const UNSET_USER = '[AUTH] UNSET_USER';

export class SetUsertAction implements Action {
    readonly type = SET_USER;
    constructor(public user: User) {}
}

export class UnsetUsertAction implements Action {
    readonly type = UNSET_USER;
}

export type ActionsAuth = SetUsertAction | UnsetUsertAction;
