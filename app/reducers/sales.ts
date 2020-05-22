import { AnyAction } from 'redux';
import { DISABLE_FORM, UPDATE_FORM } from '../actions/purchase';
import { SalesView } from '../models/Sales';

const purchase = (
  state: SalesView = {
    activeKey: 0,
    newTabIndex: 4,
    panes: []
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
