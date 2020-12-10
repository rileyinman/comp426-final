import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import * as User from '../services/User';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route {...rest} render={props => (
      User.isAuthenticated()
        ? <Component {...rest} {...props}/>
        : <Redirect to='/login'/>
    )}/>
  )
}

export default ProtectedRoute;
