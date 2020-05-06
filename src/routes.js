import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import NewDonation from './pages/newDonation';
import Profile from './pages/profile';
// import Example from './teste';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/donation/new" component={NewDonation} />
        <Route path="/profile" component={Profile} />
        {/* <Route path="/teste" component={Example} /> */}
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;
