import { Dispatch } from '../reducers/types';
import { ItemAddView } from '../models/User';
import { UPDATE_FROM_STATUS, UPDATE_FULL_FORM } from './item';

export const EDIT_USER = 'EDIT_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const GETALL_USER = 'GETALL_USER';
export const DELETE_USER = 'DELETE_USER';

export function updateForm(key: string, value: string, form: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: `UPDATE_${form.toUpperCase()}_${key.toUpperCase()}`,
      key,
      value
    });
  };
}

export function updateFullForm(values: ItemAddView) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_FULL_FORM,
      values
    });
  };
}

export function setFormDisabled(value: boolean) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_FROM_STATUS,
      value
    });
  };
}
