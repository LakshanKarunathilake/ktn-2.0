import { AnyAction } from 'redux';
import { ItemAddView } from '../models/User';
import {
  UPDATE_FORM,
  UPDATE_FROM_STATUS,
  UPDATE_FULL_FORM
} from '../actions/item';

const addItem = (
  state: ItemAddView = {
    code: '',
    description: '',
    category: '',
    vehicle: '',
    brand: '',
    unit: '',
    location: ''
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

export default addItem;
