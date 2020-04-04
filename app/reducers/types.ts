import {
  Dispatch as ReduxDispatch,
  Store as ReduxStore,
  AnyAction
} from 'redux';

export type counterStateType = {
  counter: number;
  name: number;
};

export type GetState = () => counterStateType;

export type Dispatch = ReduxDispatch<AnyAction>;

export type Store = ReduxStore<counterStateType>;
