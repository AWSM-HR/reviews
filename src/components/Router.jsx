import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import GetPath from './GetPath';

const Router = () => (
  <HashRouter>
    <Switch>
      <Route path="/destination/:id">
        <GetPath />
      </Route>
    </Switch>
  </HashRouter>
);

export default Router;
