import { Dispatch } from '../reducers/types';

export const EDIT_USER = 'EDIT_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const GETALL_USER = 'GETALL_USER';
export const DELETE_USER = 'DELETE_USER';

export function updateSignup(key: string, value: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: `UPDATE_${key.toUpperCase()}`,
      key,
      value
    });
  };
}
