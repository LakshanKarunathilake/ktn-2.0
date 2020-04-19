import {
  Dispatch as ReduxDispatch,
  Store as ReduxStore,
  AnyAction
} from 'redux';
import { ItemAddView, LoginView, SignupView } from '../models/User';

export type inventoryStoreType = {
  counter: number;
  signupForm: SignupView;
  loginForm: LoginView;
  addItem: ItemAddView;
};

export type GetState = () => inventoryStoreType;

export type Dispatch = ReduxDispatch<AnyAction>;

export type Store = ReduxStore<inventoryStoreType>;
