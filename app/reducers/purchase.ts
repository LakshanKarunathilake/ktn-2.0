import { AnyAction } from 'redux';
import { DISABLE_FORM, UPDATE_FORM } from '../actions/purchase';
import Purchase from '../models/Purchase';

const purchase = (
  state: Purchase = {
    date: '',
    discount: 0.0,
    invoiceNo: '',
    total: 0.0,
    items: [],
    returns: []
  },
  action: AnyAction
) => {
  switch (action.type) {
    case UPDATE_FORM:
      return { ...state, [action.key]: action.value };
    case DISABLE_FORM:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

export default purchase;
