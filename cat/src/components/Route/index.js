import React from 'react';
import { Route, Link, Redirect, NavLink, BrowserRouter } from 'react-router-dom';
import loadable from '@loadable/component';

export default props => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/cat/home">Home</Link>|<Link to="/cat/about">About</Link>
      </div>

      <Route exact path="/cat/home" component={loadable(() => import('../Home'))} />
      <Route exact={false} path="/cat/about" component={loadable(() => import('../About'))} />
      <Redirect to='/cat/home' />
    </BrowserRouter>
  );
};
