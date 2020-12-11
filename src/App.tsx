import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ProtectedRoute } from './auth';
import { Game, Home, Login, Level, Profile, Register } from './views';
import { NavBar } from './components';

import './App.scss';

const App = () => {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        {/* <Route path='/scores' component={Scores}/> */}
        <ProtectedRoute path='/level/:id' component={Level}/>
        <ProtectedRoute path='/game' component={Game}/>
        <ProtectedRoute path='/profile' component={Profile}/>
      </Switch>
    </>
  );
}

export default App;
