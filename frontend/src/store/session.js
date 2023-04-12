
import { csrfFetch } from "./csrf";


const SET_USER = 'session/loadUser';
const REMOVE_USER = 'session/unloadUser';
// initial User = null
const initialState = {
    user: null
}

// ============== LOGIN USER ============== //
const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const login = (user) => async (dispatch) => {
    const {credential, password} = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({credential, password})
    });
    if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user.user));
        return response;
    }
}
// =============== LOGOUT USER =============== //
const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeUser())
    }
}

// ============== RESTORE USER ============== //
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

// ============== SIGNUP USER ============== //
export const signUp = (user) => async (dispatch) => {
    const {username, firstName, lastName, email, password} = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({username, firstName, lastName, email, password})
    });
    if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user.user))
    }
}


// =============== REDUCER =============== //

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            const newState = {...state};
            newState.user = action.user;
            return newState;
        }
        case REMOVE_USER: {
            const newState = initialState;
            return newState;
        }
        default:
            return state;
    }
}

export default sessionReducer;
