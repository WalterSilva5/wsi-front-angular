import { createReducer, on } from '@ngrx/store';
import { increment, decrement } from './counter.actions';

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, { amount }) => state + amount),
  on(decrement, (state, { amount }) => state - amount)
);
