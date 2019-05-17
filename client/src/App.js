import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Animals from './components/animals/Animals';
import AddAnimal from './components/animals/AddAnimal';
import Animal from './components/animal/Animal';
import NotFound from './components/layout/NotFound';
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
    <Switch>
    <Route exact path ="/" component={ Landing } />
    <section className="container">
      <Alert/>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/animals" component={Animals} />
        <Route exact path="/animals/:id" component={Animal} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/add-animal" component={AddAnimal} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
      </section>
      </Switch>
    </>
   );
}
 
export default App;
