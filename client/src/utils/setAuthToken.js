import axios from 'axios';

// check if theres a user, and if it is, send a global header
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken;