import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ProtectedRoute } from './auth';
import { Game, Home, Login, Level, Profile, Register } from './views';
import { Loading, NavBar } from './components';

import './App.scss';

const App = () => {
  /* const { isLoading } = useAuth0(); */

  /* if (isLoading) { */
  /*   return <Loading/> */
  /* } */

  return (
    <>
      <NavBar/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <ProtectedRoute path='/level/:id' component={Level}/>
        <ProtectedRoute path='/game' component={Game}/>
        <ProtectedRoute path='/profile' component={Profile}/>
      </Switch>
    </>
  );
}

export default App;
