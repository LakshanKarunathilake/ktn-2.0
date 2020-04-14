import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import ItemAdd from './containers/ItemAdd';
import CustomerAdd from './containers/CustomerAdd';

export default function Routes() {
  return (
    <Switch>
      <Route path={routes.ITEM} component={ItemAdd} />
      <Route path={routes.CUSTOMER} component={CustomerAdd} />
    </Switch>
  );
}
