import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
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
    <Route exact path ="/" component={ Landing } />
    <section className="container">
      <Alert/>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
      </Switch>
    </section>
    </>
   );
}
 
export default App;
