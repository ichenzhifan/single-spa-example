import React from 'react';
import { Route, Link, Redirect, BrowserRouter, NavLink } from 'react-router-dom';
import loadable from '@loadable/component';

export default props => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/dog/home">Home</Link>|<Link to="/dog/about">About</Link>
      </div>

      <Route exact path="/dog/home" component={loadable(() => import('../Home'))} />
      <Route exact={false} path="/dog/about" component={loadable(() => import('../About'))} />
      <Redirect to='/dog/home' />
    </BrowserRouter>
  );
};
