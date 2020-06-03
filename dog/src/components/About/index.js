import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  HashRouter,
  Switch,
  NavLink,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from 'react-router-dom';

const T1 = props => {
  const history = useHistory();
  const location = useLocation();

  const toAbout = () => {    
    history.push('/about');
  };

  useEffect(() => {
    console.log('location changed', location.pathname);
  }, [location])

  return <div>
    <button onClick={toAbout}>about</button>
    <h1>this is T1</h1>
  </div>
};
const T2 = props => <h1>this is T2</h1>;

export default props => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    setTime(Date.now());
  }, []);

  return (
    <div>
      <h1>this is About {time}</h1>
      <div>
        <NavLink to="/about">about</NavLink> |
        <NavLink to="/about/t1">t1</NavLink> |
        <NavLink to="/about/t2">t2</NavLink>
      </div>

      <Switch>
        <Route path="/about/t1" component={T1} exact={false} />
        <Route path="/about/t2" component={T2} exact={false} />
      </Switch>
    </div>
  );
};
