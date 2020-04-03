import { AnyAction } from 'redux';
import { UPDATE_SIGNUP, LOGIN_USER } from '../actions/user';

export default function user(
  state = { key: 'name', value: '' },
  action: AnyAction
) {
  const { key, value } = action;
  switch (action.type) {
    case UPDATE_SIGNUP:
      state[key] = value;
      return state;
    case LOGIN_USER:
      return state + 1;
    default:
      return state;
  }
}
