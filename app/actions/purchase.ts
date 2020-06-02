import { Dispatch } from '../reducers/types';

export const UPDATE_FORM = 'UPDATE_FORM';
export const DISABLE_FORM = 'DISABLE_FORM';

export function updateForm(key: string, value: any) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_FORM,
      key,
      value
    });
  };
}
