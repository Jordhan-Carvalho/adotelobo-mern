import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import './App.css';

//redux
import store from './store';
import { loadUser } from './actions/auth';



const App = () => {
useEffect(() => {
  store.dispatch(loadUser());
}, [])

  return ( 
    <>
    <NavBar />
    <Route exact path ="/" component={ Landing } />
    <section className="container">
      <Alert/>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </section>
    </>
   );
}
 
export default App;
