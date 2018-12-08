import { auth, googleProvider } from '../firebaseConfig'
import { getTasksListFromDbAsyncAction } from './toDo';

const LOG_IN = 'auth/LOG_IN'
const LOG_OUT = 'auth/LOG_OUT'
const LOGIN_CHANGE_ACTION = 'auth/LOGIN_CHANGE_ACTION'
const PASSWORD_CHANGE_ACTION = 'auth/PASSWORD_CHANGE_ACTION'

const INITIAL_STATE = {
    email: "",
    password: "",
    isUserLoggedIn: false,
    user: null
}

export const initAuthChangeListeningAsyncAction = () => (dispatch, getState) => {
    auth.onAuthStateChanged(
        user => {
            if (user) {
                dispatch(logInAction(user))
                dispatch(getTasksListFromDbAsyncAction())
            } else {
                dispatch(logOutAction())
            }
        }
    )
}

export const logOutAsyncAction = () => (dispatch, getState) => {
    auth.signOut()
}

export const logInWithGoogleAsyncAction = () => (dispatch, getState) => {
    auth.signInWithPopup(googleProvider)
}

export const logInAsyncAction = () => (dispatch, getState) => {
    auth.signInWithEmailAndPassword(getState().auth.email, getState().auth.password)
        .catch(error => {
            alert('Something is wrong!')
            console.log(error)
        })
}

export const loginChangeAction = event => ({
    type: LOGIN_CHANGE_ACTION,
    email: event
})

export const passwordChangeAction = event => ({
    type: PASSWORD_CHANGE_ACTION,
    password: event
})

const logInAction = (user) => ({
    type: LOG_IN,
    user
})
const logOutAction = () => ({ type: LOG_OUT })

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isUserLoggedIn: true,
                user: action.user
            }
        case LOG_OUT:
            return {
                ...state,
                isUserLoggedIn: false,
                user: null
            }
        case LOGIN_CHANGE_ACTION:
            return {
                ...state,
                email: action.email
            }
        case PASSWORD_CHANGE_ACTION:
            return {
                ...state,
                password: action.password
            }
        default:
            return state
    }
}