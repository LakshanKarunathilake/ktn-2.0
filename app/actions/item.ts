import { Dispatch } from '../reducers/types';

export function updateForm(key: string, value: string, form: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: `UPDATE_${form.toUpperCase()}_${key.toUpperCase()}`,
      key,
      value
    });
  };
}
export function getItemNumbers(key: string, value: string, form: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: `UPDATE_${form.toUpperCase()}_${key.toUpperCase()}`,
      key,
      value
    });
  };
}
