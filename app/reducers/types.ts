import {
  Dispatch as ReduxDispatch,
  Store as ReduxStore,
  AnyAction
} from 'redux';
import { ItemAddView, LoginView, SignupView } from '../models/User';
import { Customer } from '../models/Customer';

export type inventoryStoreType = {
  counter: number;
  signupForm: SignupView;
  loginForm: LoginView;
  addItem: ItemAddView;
  addCustomer: Customer;
};

export type GetState = () => inventoryStoreType;

export type Dispatch = ReduxDispatch<AnyAction>;

export type Store = ReduxStore<inventoryStoreType>;
