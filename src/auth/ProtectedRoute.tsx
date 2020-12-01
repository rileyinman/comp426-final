import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

import * as User from '../services/User';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const location = useLocation();
  return (
    <Route {...rest} render={props => (
      User.isAuthenticated()
        ? <Component {...rest} {...props}/>
        : <Redirect to={{ pathname: '/login', state: { prevPath: location.pathname } }}/>
    )}/>
  )
}

export default ProtectedRoute;
