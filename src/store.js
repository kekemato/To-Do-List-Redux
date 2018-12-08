import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import auth from './state/auth'
import toDo from './state/toDo'

const reducer = combineReducers({
    auth,
    toDo
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(

    reducer,

    composeEnhancers(

        applyMiddleware(thunk)

    )

)