import { Dispatch } from '../reducers/types';
import { ItemAddView } from '../models/User';

export const GET_PART_NUMBERS = 'GET_PART_NUMBERS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
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
  console.log('callling', value);
  return (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_FROM_STATUS,
      value
    });
  };
}

export function getItemNumbers(value: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: GET_PART_NUMBERS,
      value
    });
  };
}
export function getCategories(value: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: GET_CATEGORIES,
      value
    });
  };
}
export function addItem(value: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'GET_CATEGORIES',
      value
    });
  };
}
