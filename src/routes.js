import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/register';
import Donor from './pages/donor';
import Company from './pages/company';
import Home from './pages/home';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/company' component={Company} />
        <Route path='/donor' component={Donor} />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;