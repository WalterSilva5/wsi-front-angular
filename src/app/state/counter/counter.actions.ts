import { createAction } from "@ngrx/store";

export enum CounterActionTypes {
  INCREMENT = '[Counter] INCREMENT',
  DECREMENT = '[Counter] DECREMENT',
}

export const increment = createAction(CounterActionTypes.INCREMENT, ({ amount }) => ({ amount }));

export const decrement = createAction(CounterActionTypes.DECREMENT, ({ amount }) => ({ amount }));
