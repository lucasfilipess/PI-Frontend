import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import NewDonation from './pages/newDonation';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/donation/new' component={NewDonation} />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;