import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

import setAuthToken from './utils/setAuthToken';

import './App.css';

//redux
import store from './store';
import { loadUser } from './actions/auth';

// Needed for calling user_loaded before get_profile
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
useEffect(() => {
  store.dispatch(loadUser());
}, [])

  return ( 
    <>
    <NavBar />
    <Switch>
    <Route exact path ="/" component={ Landing } />
    <Route component={Routes} />
      </Switch>
    </>
   );
}
 
export default App;
