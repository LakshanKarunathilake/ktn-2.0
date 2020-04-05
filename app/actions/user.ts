import { Dispatch } from '../reducers/types';

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
