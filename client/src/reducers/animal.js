import { GET_ANIMALS, ANIMAL_ERROR, UPDATE_LIKES, DELETE_ANIMAL, ADD_ANIMAL, GET_ANIMAL, ADD_COMMENT, REMOVE_COMMENT } from "../actions/types";


const initialState = {
    animals: [],
    animal: null,
    loading:true,
    error: {}
}

export default function( state = initialState, action ) {
    const {type, payload} = action;
    switch(type) {
        case GET_ANIMALS:
        return {
            ...state,
            animals: payload,
            loading: false
        };
        case GET_ANIMAL:
        return {
            ...state,
            animal: payload,
            loading: false
        }
        case ADD_ANIMAL:
        return {
            ...state,
            animals: [...state.animals, payload],
            loading: false
        }
        case DELETE_ANIMAL:
        return {
            ...state,
            animals: state.animals.filter( animal => animal._id !== payload),
            loading: false
        }
        case ANIMAL_ERROR:
        return {
            ...state,
            error: payload,
            loading: false
        };
        case UPDATE_LIKES:
        return {
            ...state,
            animals: state.animals.map(animal => animal._id === payload.animalId ? {...animal, likes: payload.likes} :
                animal),
            loading: false
        };
        case ADD_COMMENT:
        return {
            ...state,
            animal: { ...state.animal, comments: [...payload] },
            loading: false
        };
        case REMOVE_COMMENT:
        return {
            ...state,
            animal: {...state.animal,
                 comments: state.animal.comments.filter( comment => comment._id !== payload) 
                },
            loading: false
        }
        default:
        return state;
    } 
}