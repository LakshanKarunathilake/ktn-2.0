import { AnyAction } from 'redux';
import {
  UPDATE_FORM,
  UPDATE_FROM_STATUS,
  UPDATE_FULL_FORM
} from '../actions/item';
import { Customer } from '../models/Customer';

const addCustomer = (
  state: Customer = {
    name: '',
    address: '',
    contactNumber: '',
    note: ''
  },
  action: AnyAction
) => {
  switch (action.type) {
    case UPDATE_FORM:
      return { ...state, [action.key]: action.value };
    case UPDATE_FULL_FORM:
      return { ...state, ...action.values };
    case UPDATE_FROM_STATUS:
      return { ...state, formDisabled: action.value };
    default:
      return state;
  }
};

export default addCustomer;
