import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import animal from './animal';


export default combineReducers({
    alert,
    auth,
    profile,
    animal
});