import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';



const App = () => {
  return ( 
    <>
    <NavBar />
    <Route exact path ="/" component={ Landing } />
    <section className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </section>
    </>
   );
}
 
export default App;
