import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.SIGNUP} component={SignupPage} />
        <Route path={routes.LOGIN} component={LoginPage} />
        <Route path={routes.HOME} component={LoginPage} />
      </Switch>
    </App>
  );
}
