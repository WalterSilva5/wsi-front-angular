import { createAction, props } from '@ngrx/store';
import { AuthState } from './auth.models';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Logout = '[Auth] Logout',
}


export const loginSuccess = createAction(
  AuthActionTypes.LoginSuccess,
  props<{ auth: AuthState }>()
);

export const logout = createAction(AuthActionTypes.Logout);

export const loginFailure = createAction(
  AuthActionTypes.LoginFailure,
  props<{ error: any }>()
);
