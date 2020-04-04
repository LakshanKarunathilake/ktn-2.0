import { AnyAction } from 'redux';
import { SignupView, UserFormView } from '../models/User';

export const signupForm = (
  state: SignupView = {
    username: '',
    adminPassword: '',
    password: '',
    contact: ''
  },
  action: AnyAction
) => {
  console.log('state', state, action);
  let temp;
  switch (action.type) {
    case 'UPDATE_USERNAME':
      temp = { ...state };
      temp.username = action.value;
      return temp;
    case 'UPDATE_PASSWORD':
      temp = { ...state };
      temp.password = action.value;
      return temp;
    case 'UPDATE_ADMINPASSWORD':
      temp = { ...state };
      temp.adminPassword = action.value;
      return temp;
    case 'UPDATE_CONTACT':
      temp = { ...state };
      temp.contact = action.value;
      return temp;
    default:
      return state;
  }
};

export const loginForm = (
  state: UserFormView = {
    username: '',
    password: ''
  },
  action: AnyAction
) => {
  console.log('state', state, action);
  let temp;
  switch (action.type) {
    case 'UPDATE_USERNAME':
      temp = { ...state };
      temp.username = action.value;
      return temp;
    case 'UPDATE_PASSWORD':
      temp = { ...state };
      temp.password = action.value;
      return temp;
    default:
      return state;
  }
};
