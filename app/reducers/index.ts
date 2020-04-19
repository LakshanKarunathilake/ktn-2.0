import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { loginForm, signupForm } from './user';
import addItem from './item';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    loginForm,
    signupForm,
    addItem
  });
}
