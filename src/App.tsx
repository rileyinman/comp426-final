import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* import { ProtectedRoute } from './auth'; */
import { Game, Home, Login, Profile } from './views';
import { Loading, NavBar } from './components';

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
        <Route path='/game' component={Game}/>
        <Route path='/login' component={Login}/>
        <Route path='/profile' component={Profile}/>
        {/* <ProtectedRoute path='/profile' component={Profile}/> */}
      </Switch>
    </>
  );
}

export default App;
