import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure, logout } from './auth.actions';
import { AuthState, initialAuthState } from './auth.models';

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { auth }) => {
    localStorage.setItem('auth', JSON.stringify(auth));
    return {
      ...state,
      ...auth,
      isAuthenticated: true,
      error: null,
    };
  }),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(logout, (state) => {
    localStorage.clear();
    return {
      ...state,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      user: null,
      error: null,
    };
  })
);
