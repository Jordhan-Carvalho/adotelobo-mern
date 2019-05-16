import axios from 'axios';
import { setAlert } from './alert';
import { GET_ANIMALS, ANIMAL_ERROR, UPDATE_LIKES, DELETE_ANIMAL, ADD_ANIMAL, GET_ANIMAL, ADD_COMMENT, REMOVE_COMMENT } from './types';

// Get animals
export const getAnimals = () => async dispatch => {
    try {
        const res = await axios.get('/api/animals');

        dispatch({
            type: GET_ANIMALS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ANIMAL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get animal by id
export const getAnimalById = (animalId) => async dispatch => {
    try {
        const res = await axios.get(`/api/animals/${animalId}`);

        dispatch({
            type: GET_ANIMAL,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ANIMAL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add animal
export const addAnimal = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const res = await axios.post('/api/animals', formData, config);
    
        dispatch({
            type: ADD_ANIMAL,
            payload: res.data
        });
    
        dispatch(setAlert('Animal Added', 'success'));
    
        history.push('/animals');

    } catch (err) {
        dispatch({
            type: ANIMAL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete animal
export const deleteAnimal = (animalId) => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone')) {
    try {
        await axios.delete(`/api/animals/${animalId}`);

        dispatch({
            type: DELETE_ANIMAL,
            payload: animalId
        });

        dispatch(setAlert('Animal Removed', 'success'));
    } catch (err) {
        dispatch({
            type: ANIMAL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
}

// Add like
export const addLike = animalId => async dispatch => {
    try {
        const res = await axios.put(`/api/animals/like/${animalId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {animalId, likes: res.data}
        });
    } catch (err) {
        if (err.response.status === 401) {
            dispatch(setAlert("You need to login to like an animal ", 'danger'));
        }
        if (err.response.status === 400) {
            dispatch(setAlert("You already liked this animal ", 'danger'));
        }
        dispatch({
            type: ANIMAL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Remove like
export const removeLike = animalId => async dispatch => {
    try {
        const res = await axios.put(`/api/animals/unlike/${animalId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {animalId, likes: res.data}
        });
    } catch (err) {
        if (err.response.status === 401) {
            dispatch(setAlert("You need to login to unlike an animal ", 'danger'));
        }
        if (err.response.status === 400) {
            dispatch(setAlert("You already unliked this animal ", 'danger'));
        }
        dispatch({
            type: ANIMAL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add comment
export const addComment = (formData, animalId) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post(`/api/animals/comment/${animalId}`, formData, config);
    
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
    
        dispatch(setAlert('Comment Added', 'success'));

    } catch (err) {
        dispatch({
            type: ANIMAL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Delete comment
export const deleteComment = (animalId, commentId) => async dispatch => {
    try {

        await axios.delete(`/api/animals/comment/${animalId}/${commentId}`);
    
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
    
        dispatch(setAlert('Comment Removed', 'success'));

    } catch (err) {
        dispatch({
            type: ANIMAL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};