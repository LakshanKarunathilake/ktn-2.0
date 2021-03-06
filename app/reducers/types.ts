import {
  Dispatch as ReduxDispatch,
  Store as ReduxStore,
  AnyAction
} from 'redux';
import { ItemAddView, LoginView, SignupView } from '../models/User';
import { Customer } from '../models/Customer';
import Purchase from '../models/Purchase';

export type inventoryStoreType = {
  counter: number;
  signupForm: SignupView;
  loginForm: LoginView;
  addItem: ItemAddView;
  addCustomer: Customer;
  purchase: Purchase;
};

export type GetState = () => inventoryStoreType;

export type Dispatch = ReduxDispatch<AnyAction>;

export type Store = ReduxStore<inventoryStoreType>;
