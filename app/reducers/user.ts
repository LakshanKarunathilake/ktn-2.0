import { AnyAction } from 'redux';
import { SignupView, LoginView } from '../models/User';

export const signupForm = (
  state: SignupView = {
    username: '',
    adminPassword: '',
    password: '',
    contact: ''
  },
  action: AnyAction
) => {
  let temp;
  switch (action.type) {
    case 'UPDATE_SIGNUP_USERNAME':
      temp = { ...state };
      temp.username = action.value;
      return temp;
    case 'UPDATE_SIGNUP_PASSWORD':
      temp = { ...state };
      temp.password = action.value;
      return temp;
    case 'UPDATE_SIGNUP_ADMINPASSWORD':
      temp = { ...state };
      temp.adminPassword = action.value;
      return temp;
    case 'UPDATE_SIGNUP_CONTACT':
      temp = { ...state };
      temp.contact = action.value;
      return temp;
    default:
      return state;
  }
};

export const loginForm = (
  state: LoginView = {
    username: '',
    password: ''
  },
  action: AnyAction
) => {
  let temp;
  switch (action.type) {
    case 'UPDATE_LOGIN_USERNAME':
      temp = { ...state };
      temp.username = action.value;
      console.log('temp', temp);
      return temp;
    case 'UPDATE_LOGIN_PASSWORD':
      temp = { ...state };
      temp.password = action.value;
      return temp;
    default:
      return state;
  }
};
