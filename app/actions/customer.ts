import { Dispatch } from '../reducers/types';
import { ItemAddView } from '../models/User';

export const UPDATE_FORM = 'UPDATE_FORM';
export const UPDATE_FULL_FORM = 'UPDATE_FULL_FORM';
export const UPDATE_FROM_STATUS = 'UPDATE_FROM_STATUS';

export function updateForm(key: string, value: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_FORM,
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
