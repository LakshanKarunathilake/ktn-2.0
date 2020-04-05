import {
  Dispatch as ReduxDispatch,
  Store as ReduxStore,
  AnyAction
} from 'redux';
import { LoginView, SignupView } from '../models/User';

export type inventoryStoreType = {
  counter: number;
  signupForm: SignupView;
  loginForm: LoginView;
};

export type GetState = () => inventoryStoreType;

export type Dispatch = ReduxDispatch<AnyAction>;

export type Store = ReduxStore<inventoryStoreType>;
